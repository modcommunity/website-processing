import { TypeAnimation } from "react-type-animation";

type Props = {
    sequence?: (string | number)[]
}

export default function HeadingTitle({ sequence = ["A Modding & Game Dev Community"] }: Props) {
    return (
        <TypeAnimation
            sequence={sequence}
            speed={5}
            wrapper="h2"
            className="text-foreground text-3xl @2xl:text-4xl @5xl:text-5xl font-extrabold drop-shadow"
        />
    )
}