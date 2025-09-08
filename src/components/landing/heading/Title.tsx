import { TypeAnimation } from "react-type-animation";

export default function HeadingTitle() {
    return (
        <TypeAnimation
            sequence={["A Modding & Game Dev Community"]}
            speed={5}
            wrapper="h2"
            className="text-white text-lg lg:text-3xl font-bold "
        />
    )
}