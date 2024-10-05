import HomeSliderComp from "@/components/HomeSliderComp/page";
import OurRecentArch from "@/components/OurRecentArch/page";
import CheckTopBlog from "@/components/checkTopBlog/page";
import ExploreMore from "@/components/exploreMore/page";
import OurBestSeller from '@/components/ourBestSeller/OurBestSeller';
import OurIngradient from "@/components/ourIngradient/page";
import TopRanker from "@/components/topRanker/page";
import WhyChoose from "@/components/whyChoose/page";
import Ayurvedexpert from "../(auth)/_components/ayurvedexpert";

export default function Home() {
  return (
    <main className="">
      
      <HomeSliderComp pageName="home" />
        <TopRanker />
        <OurBestSeller />

        {/* video section */}
        {/* <CustomerReview /> */}
        {/* <Banner /> */}
      <div className="max-w-7xl mx-auto">
        <ExploreMore />
        <OurRecentArch />
        <WhyChoose />
        <OurIngradient />
      </div>
      {/* <Banner /> */}
        <CheckTopBlog />
        {/* <OurCertification /> */}
        <Ayurvedexpert />
    </main>
  );
}
