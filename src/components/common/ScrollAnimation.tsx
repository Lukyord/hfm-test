import ScrollAnimationBase, { ScrollAnimationProps } from "react-animate-on-scroll";

const defaultProps: Partial<ScrollAnimationProps> = {
    animateOnce: true,
    offset: 0,
    duration: 1,
    delay: 0,
};

export default function ScrollAnimation(props: ScrollAnimationProps) {
    return <ScrollAnimationBase {...defaultProps} {...props} />;
}
