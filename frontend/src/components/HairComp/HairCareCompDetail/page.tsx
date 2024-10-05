import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import React from 'react'

export default function HairCareCompDetail() {
    const arr = [
        {
            val:'Best Natural Hair Care products - Ayurvedic Hair Care Products',
            val2:`Ayurveda recommends following a regular hair care regimen with the best natural hair products for long lustrous hair. Ayurvedic hair care typically includes steps like cleansing, conditioning, and massaging. The best part about Ayurvedic hair products is that there are no damaging chemicals. Kama Ayurveda’s natural hair treatments using pure natural herb extracts are effective solutions for hair problems like dandruff, premature graying, and hair dryness.`,
        },
        {
            val:'About Our Natural Hair Care Products',
            val2:'Kama Ayurveda serves the knowledge and the goodness of Ayurveda in its natural hair care products. Our range of hair care products include natural hair cleansers & conditioners, natural hair color, and natural hair oils. Every product combines the luxurious feel of nature and wisdom of the ancient science - Ayurveda.',
        },
        {
            val:'Our Best Ayurvedic Hair Care Products',
            val2:'Kama brings you a range of herbal hair care products with the best benefits for hair. Give yourself the ultimate Ayurvedic hair treatment with these hair replenishing organic hair care products. All our hair oils are 100% herbal and natural.',
        },
    ]
  return (
    <div className='grid gap-8 my-10'>
        {arr.map((ele,i)=>(
            <div className='grid gap-2'>
                <h1 className={cn('md:text-2xl text-xl capital ', forum.className)}>{ele?.val}</h1>
                <p className='text-[#4A3F3F] text-sm md:text-base capital text-justify'>{ele?.val2}</p>
            </div>
        ))}

    </div>
  )
}
