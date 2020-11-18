import { TagItemSubtotal } from './TagItemSubtotal'
import {loadAllItems, loadPromotions} from './Dependencies'
import { Tag } from './Tag'
import { TagItem } from './TagItem'

function reformTags(tags: string[]): string[] {
  const newTags: string[] = []
  for(let i = 0; i < tags.length; i++) {
    newTags.push(tags[i].substring(0,10))
  }
  return newTags
}

function getUniqueBarcodes(tags: string[]): string[] {
  const newTags = reformTags(tags)
  const barcodes: string[] = []
  for(let i = 0; i < newTags.length; i++) {
    if(barcodes.indexOf(newTags[i]) === -1) {
      barcodes.push(newTags[i])
    }
  }
  return barcodes
}

//console.log(getUniqueBarcodes(reformTags(data)))

function getQuantity(tags: string[]) {
  const newTags = reformTags(tags)
  const newBarcodes = getUniqueBarcodes(newTags)
  const counts: number[] = []
  for(let i = 0; i < newBarcodes.length; i++) {
    let count = 0
    for(let j = 0; j < tags.length; j++) {
      if(tags[j] === tags[j].substring(0,10) && tags[j].substring(0, 10) === newBarcodes[i]) count++
      if(tags[j] !== tags[j].substring(0,10) && tags[j].substring(0, 10) === newBarcodes[i]) {
        count += Number(tags[j].substring(11))
      }
    }
    counts.push(count)
  }
  return counts
}

function processTags(barcode: string[], quantity: number[]): Tag[]
{
  const myTags: Tag[] = []
  for(let i = 0; i < barcode.length; i++)
  {
    const myTag: Tag =
      {
        barcode: barcode[i],
        quantity: quantity[i]
      }
    myTags.push(myTag)
  }
  return myTags
}

function getItemInformation(myTags: Tag[]): TagItem[]
{
  const allItems = loadAllItems()
  const myTagItems: TagItem[] = []
  for(let i = 0; i < myTags.length; i++)
  {
    for(let j = 0; j < allItems.length; j++)
    {
      if(allItems[j].barcode === myTags[i].barcode)
      {
        const myTagItem: TagItem =
                {
                  name: allItems[j].name,
                  barcode: myTags[i].barcode,
                  quantity: myTags[i].quantity,
                  unit: allItems[j].unit,
                  price: allItems[j].price
                }
        myTagItems.push(myTagItem)
      }
    }
  }
  return myTagItems
}

function isReceiptBarcodePromotion(myTagItem: TagItem): boolean
{
  const promotion = loadPromotions()
  const promotionTags = promotion[0].barcodes
  const condition = promotionTags.indexOf(myTagItem.barcode) !== -1
  return condition
}

function calculateSubtotal(myTagItems: TagItem[]): TagItemSubtotal[]
{
  const myTagItemSubtotals: TagItemSubtotal[] = []
  let subtotal: number
  for(let i = 0; i < myTagItems.length; i++)
  {
    if(!isReceiptBarcodePromotion(myTagItems[i]))
    {
      subtotal = myTagItems[i].quantity * myTagItems[i].price
    }
    else
    {
      if(myTagItems[i].quantity >= 3)
      {
        subtotal = (myTagItems[i].quantity - 1) * myTagItems[i].price
      }
      else
      {
        subtotal = myTagItems[i].quantity * myTagItems[i].price
      }
    }
    const myTagItemSubtotal: TagItemSubtotal =
        {
          name: myTagItems[i].name,
          barcode: myTagItems[i].barcode,
          quantity: myTagItems[i].quantity,
          unit: myTagItems[i].unit,
          price: myTagItems[i].price,
          subtotal: subtotal
        }
    myTagItemSubtotals.push(myTagItemSubtotal)
  }
  return myTagItemSubtotals
}

function calculateTotalToString(myTagItemSubtotal: TagItemSubtotal[]): string
{
  let total = 0
  for(let i = 0; i < myTagItemSubtotal.length; i++)
  {
    total += myTagItemSubtotal[i].subtotal
  }
  return `Total：${total.toFixed(2)}(yuan)`
}

function calculateDiscountedPriceToString(myTagItemSubtotal: TagItemSubtotal[]): string
{
  let dicountedPrice = 0
  for(let i = 0; i < myTagItemSubtotal.length; i++)
  {
    if(isReceiptBarcodePromotion(myTagItemSubtotal[i]))
    {
      if(myTagItemSubtotal[i].quantity >= 3)
      {
        dicountedPrice += myTagItemSubtotal[i].price
      }
    }
  }
  return `Discounted prices：${dicountedPrice.toFixed(2)}(yuan)`
}

function processOutput(myTagItemSubtotal: TagItemSubtotal[]): string
{
  let output = ''
  for(let i = 0; i < myTagItemSubtotal.length; i++)
  {
    let spacing = ''
    if(myTagItemSubtotal[i].quantity > 1)
    {
      spacing = myTagItemSubtotal[i].unit + 's'
    }
    else
    {
      spacing = myTagItemSubtotal[i].unit
    }
    output += `Name：${myTagItemSubtotal[i].name}，Quantity：${myTagItemSubtotal[i].quantity} ${spacing}，Unit：${myTagItemSubtotal[i].price.toFixed(2)}(yuan)，Subtotal：${myTagItemSubtotal[i].subtotal.toFixed(2)}(yuan)\n`
  }
  return output
}

export function printReceipt(tags: string[]): string
{

  const barcodes = getUniqueBarcodes(tags)
  const quanties = getQuantity(tags)
  const myTags = processTags(barcodes, quanties)
  const myTagItems = getItemInformation(myTags)
  const myTagItemSubtotals = calculateSubtotal(myTagItems)
  const totalText = calculateTotalToString(myTagItemSubtotals)
  const dicountedPriceText = calculateDiscountedPriceToString(myTagItemSubtotals)
  const itemsText = processOutput(myTagItemSubtotals)

  const receipt = `***<store earning no money>Receipt ***\n${itemsText}----------------------\n${totalText}\n${dicountedPriceText}\n**********************`
  return receipt
}
