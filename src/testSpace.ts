// import { table } from 'console'

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
//   const Barcodes: string[] = []
//   for(let i = 0; i < tags.length; i++) {
//     if(Barcodes.indexOf(tags[i]) === -1) {
//       Barcodes.push(tags[i])
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


// //console.log(getUniqueBarcodes(data))


