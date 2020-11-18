// import { TagItemSubtotal } from './TagItemSubtotal'
// import { TagItem } from './TagItem'
// import { Tag } from './Tag'
// import { table } from 'console'
// import { loadAllItems, loadPromotions } from './Dependencies'


// const data = [
//   'ITEM000001',
//   'ITEM000001',
//   'ITEM000001',
//   'ITEM000001',
//   'ITEM000001',
//   'ITEM000003-2.5',
//   'ITEM000005',
//   'ITEM000005-2',
// ]


// function reformTags(tags: string[]): string[] {
//   const newTags: string[] = []
//   for(let i = 0; i < tags.length; i++) {
//     newTags.push(tags[i].substring(0,10))
//   }
//   return newTags
// }

// function getUniqueBarcodes(tags: string[]): string[] {
//   const newTags = reformTags(tags)
//   const Barcodes: string[] = []
//   for(let i = 0; i < newTags.length; i++) {
//     if(Barcodes.indexOf(newTags[i]) === -1) {
//       Barcodes.push(newTags[i])
//     }
//   }
//   return Barcodes
// }

// //console.log(getUniqueBarcodes(reformTags(data)))

// function getQuantity(tags: string[]) {
//   const newTags = reformTags(tags)
//   const Barcodes = getUniqueBarcodes(newTags)
//   const counts: number[] = []
//   for(let i = 0; i < Barcodes.length; i++) {
//     let count = 0
//     for(let j = 0; j < tags.length; j++) {
//       if(tags[j] === tags[j].substring(0,10) && tags[j].substring(0, 10) === Barcodes[i]) count++
//       if(tags[j] !== tags[j].substring(0,10) && tags[j].substring(0, 10) === Barcodes[i]) {
//         count += Number(tags[j].substring(11))
//       }
//     }
//     counts.push(count)
//   }
//   return counts
// }

// console.log(getQuantity(data))

// function processTags(barcode: string[], quantity: number[]): Tag[]
// {
//   const myTags: Tag[] = []
//   for(let i = 0; i < barcode.length; i++)
//   {
//     const myTag: Tag =
//       {
//         Barcode: barcode[i],
//         quantity: quantity[i]
//       }
//     myTags.push(myTag)
//   }
//   return myTags
// }

// function getItemInformation(myTags: Tag[]): TagItem[]
// {
//   const allItems = loadAllItems()
//   const myTagItems: TagItem[] = []
//   for(let i = 0; i < myTags.length; i++)
//   {
//     for(let j = 0; j < allItems.length; j++)
//     {
//       let myTagItem: TagItem
//       if(allItems[j].barcode === myTags[i].Barcode)
//       {
//         const myTagItem: TagItem =
//                 {
//                   Name: allItems[j].name,
//                   Barcode: myTags[i].Barcode,
//                   Quantity: myTags[i].quantity,
//                   Unit: allItems[j].unit,
//                   Price: allItems[j].price
//                 }
//         myTagItems.push(myTagItem)
//       }
//     }
//   }
//   return myTagItems
// }

// function isReceiptBarcodePromotion(myTagItem: TagItem): boolean
// {
//   const promotion = loadPromotions()
//   const promotionTags = promotion[0].barcodes
//   const condition = promotionTags.indexOf(myTagItem.Barcode) !== -1
//   return condition
// }

// function calculateSubtotal(myTagItems: TagItem[]): TagItemSubtotal[]
// {
//   const myTagItemSubtotals: TagItemSubtotal[] = []
//   let Subtotal: number
//   for(let i = 0; i < myTagItems.length; i++)
//   {
//     if(!isReceiptBarcodePromotion(myTagItems[i]))
//     {
//       Subtotal = myTagItems[i].Quantity * myTagItems[i].Price
//     }
//     else
//     {
//       if(myTagItems[i].Quantity >= 3)
//       {
//         Subtotal = (myTagItems[i].Quantity - 1) * myTagItems[i].Price
//       }
//       else
//       {
//         Subtotal = myTagItems[i].Quantity * myTagItems[i].Price
//       }
//     }
//     const myTagItemSubtotal: TagItemSubtotal =
//         {
//           Name: myTagItems[i].Name,
//           Barcode: myTagItems[i].Barcode,
//           Quantity: myTagItems[i].Quantity,
//           Unit: myTagItems[i].Unit,
//           Price: myTagItems[i].Price,
//           Subtotal: Subtotal
//         }
//     myTagItemSubtotals.push(myTagItemSubtotal)
//   }
//   return myTagItemSubtotals
// }

// function calculateTotalToString(myTagItemSubtotal: TagItemSubtotal[]): string
// {
//   let total = 0
//   for(let i = 0; i < myTagItemSubtotal.length; i++)
//   {
//     total += myTagItemSubtotal[i].Subtotal
//   }
//   return `Total：${total.toFixed(2)}(yuan)`
// }

// function calculateDiscountedPriceToString(myTagItemSubtotal: TagItemSubtotal[]): string
// {
//   let dicountedPrice = 0
//   for(let i = 0; i < myTagItemSubtotal.length; i++)
//   {
//     if(isReceiptBarcodePromotion(myTagItemSubtotal[i]))
//     {
//       if(myTagItemSubtotal[i].Quantity >= 3)
//       {
//         dicountedPrice += myTagItemSubtotal[i].Price
//       }
//     }
//   }
//   return `Discounted prices：${dicountedPrice.toFixed(2)}(yuan)`
// }

// function processOutput(myTagItemSubtotal: TagItemSubtotal[]): string
// {
//   let output = ''
//   for(let i = 0; i < myTagItemSubtotal.length; i++)
//   {
//     let spacing = ''
//     if(myTagItemSubtotal[i].Quantity > 1)
//     {
//       spacing = myTagItemSubtotal[i].Unit + 's'
//     }
//     else
//     {
//       spacing = myTagItemSubtotal[i].Unit
//     }
//     output += `Name：${myTagItemSubtotal[i].Name}，Quantity：${myTagItemSubtotal[i].Quantity} ${spacing}，Unit：${myTagItemSubtotal[i].Price.toFixed(2)}(yuan)，Subtotal：${myTagItemSubtotal[i].Subtotal.toFixed(2)}(yuan)\n`
//   }
//   return output
// }

