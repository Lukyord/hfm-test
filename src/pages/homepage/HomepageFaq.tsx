import Accordion from "@/components/common/Accordion";

export default function HomepageFaq() {
    const faq = [
        {
            title: "Question A",
            content: "<p>Answer A</p>",
        },
        {
            title: "Question B",
            content: "<p>Answer B</p>",
        },
        {
            title: "Question C",
            content: "<p>Answer C</p>",
        },
        {
            title: "Question D",
            content: "<p>Answer D</p>",
        },
    ];

    return (
        <section data-section="faq">
            <div className="sc-inner pc-t-75 pc-b-150 mb-t-75 mb-b-200">
                <div className="container">
                    <div className="sc-ttl">
                        <h2 className="size-h2">FAQs</h2>
                    </div>

                    {faq.map((item) => (
                        <Accordion key={item.title} title={item.title}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.content,
                                }}
                            />
                        </Accordion>
                    ))}
                </div>
            </div>
        </section>
    );
}
