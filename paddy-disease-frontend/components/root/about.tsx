import Section from "@/components/all/text-image-section";

export default function About() {
  const cardData = [
    {
      heading: "Empowering Farmers Through Innovation",
      message:
        "We are dedicated to equipping farmers with cutting-edge technology, advanced tools, and knowledge that empower them to achieve greater productivity. Our goal is not only to enhance yields but also to do so in a way that preserves the planet’s precious resources for future generations, promoting a sustainable farming future.",
      imageSrc: "images/home/empowering-farmer-through-innovation.jpg",
    },
    {
      heading: "The Purpose Behind Our Work",
      message:
        "Our existence is driven by a powerful belief: that the future of agriculture must be sustainable, efficient, and environmentally responsible. We are committed to creating solutions that allow farmers to produce food for the growing global population, while minimizing the ecological impact and protecting the environment for future generations.",
      imageSrc: "images/home/purpose-behind-work.jpg",
    },
    {
      heading: "A Vision for the Future of Agriculture",
      message:
        "We envision a future where technology, innovation, and agriculture come together to create a thriving, sustainable industry that can meet the challenges of global food security. By integrating cutting-edge technology into farming practices, we believe we can build a resilient agricultural ecosystem capable of feeding the world for generations to come.",
      imageSrc: "images/home/vision-for-future.jpg",
    },
    {
      heading: "Fostering Sustainable Farming Practices",
      message:
        "Our commitment to sustainability goes beyond just protecting the environment. We promote farming methods that ensure ecological balance, reduce waste, and enhance long-term food security. By supporting these practices, we aim to create a future where agriculture thrives in harmony with the natural world, ensuring food security for generations ahead.",
      imageSrc: "images/home/sustainable-practices.jpg",
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 py-12  text-text gap-8">
      <h2 className="text-3xl font-semibold text-center ">About Us</h2>
      <div className="text-lg max-w-2xl mx-auto">
        We are dedicated to empowering farmers with advanced technology to
        detect crop diseases early, helping improve crop health and yield. With
        cutting-edge tools and expert support, we aim to make a significant
        impact in sustainable agriculture.
      </div>

      <div className="flex flex-col justify-center items-center ">
        {cardData.map((card, index) => (
          <Section
            key={index}
            heading={card.heading}
            message={card.message}
            imageSrc={card.imageSrc}
            isImageLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
