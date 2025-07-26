import { TypeAnimation } from "react-type-animation";

export default function DevText() {
    return (
        <TypeAnimation
            sequence={["In Development..."]}
            speed={5}
            wrapper="h3"
            className="text-white italic font-bold text-xl"
        />
    )
}