import { TypeAnimation } from "react-type-animation";

export default function HeadingTitle() {
    return (
        <TypeAnimation
            sequence={["A Modding & Game Dev Community"]}
            speed={5}
            wrapper="h2"
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold drop-shadow"
        />
    )
}