import Container from "@/components/elements/Container";
import banner from "../../../assets/images/5314-removebg-prev.png";

const Banner = () => {
    return (
        <div className="w-full bg-[#DED3CA] h-full p-8 rounded-md">

            <Container>
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
                <div>
                    <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] lg:text-start text-center text-[#e92939]">Be
                        fashionable with Barner Glasses</h1>
                    <p className="text-[16px] mt-2 lg:text-start text-center text-gray-700">Revolutionizing the eyewear industry
                        in the country with its omni-channel approach.</p>


                </div>

                {/* image */}
                <img src={banner} alt="image" className="w-full lg:w-[55%]"/>
            </header>
        </Container>
           
        </div>
    );
};

export default Banner;