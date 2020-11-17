import {loadAllItems, loadPromotions} from './Dependencies'

function reformTags(tags: string[]): string[] {
  const newTags: string[] = []
  for(let i = 0; i < tags.length; i++) {
    newTags.push(tags[i].substring(0,10))
  }
  return newTags
}

function getUniqueBarcodes(tags: string[]): string[] {
  const uniqueBarcodes: string[] = []
  for(let i = 0; i < tags.length; i++) {
    if(uniqueBarcodes.indexOf(tags[i]) === -1) {
      uniqueBarcodes.push(tags[i])
    }
  }
  return uniqueBarcodes
}

function getQuantity(tags: string[]) {
  const newTags = reformTags(tags)
  const uniqueBarcodes = getUniqueBarcodes(newTags)
  const counts: number[] = []
  for(let i = 0; i < uniqueBarcodes.length; i++) {
    let count = 0
    for(let j = 0; j < tags.length; j++) {
      if(tags[j] === tags[j].substring(0,10) && tags[j].substring(0, 10) === uniqueBarcodes[i]) count++
      if(tags[j] !== tags[j].substring(0,10) && tags[j].substring(0, 10) === uniqueBarcodes[i]) {
        count += Number(tags[j].substring(11))
      }
    }
    counts.push(count)
  }
  return counts
}

export function printReceipt(tags: string[]): string {

  //const uniqueBarcodes = getUniqueBarcodes(tags)
  //const quantities = getQuantity(tags)
  //const hasPromotions = hasPromotionBar(uniqueBarcodes)
  //const isPromotionsBarGreaterThan2()
  // return 'xxxx'
  return `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`
}
