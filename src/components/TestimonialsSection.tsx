import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  imageSrc: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, rating, imageSrc }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col h-full">
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i}
            size={18}
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6 flex-grow">{quote}</p>
      <div className="flex items-center">
        <img
          src={imageSrc}
          alt={author}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "As a content creator, I need to produce a lot of content quickly. HumanizeAI helps me generate content with AI and then make it sound perfectly natural. It's saved me hours every week!",
      author: "Sarah Johnson",
      role: "Content Marketing Manager",
      rating: 5,
      imageSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      quote: "I was skeptical at first, but HumanizeAI completely transformed my workflow. My academic papers now pass AI detection tools while maintaining academic integrity.",
      author: "Michael Chen",
      role: "Graduate Student",
      rating: 4,
      imageSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      quote: "Our agency uses HumanizeAI for all our client work. The ability to adjust tone and style for different brand voices is incredibly valuable. Highly recommended!",
      author: "Jessica Williams",
      role: "Creative Director",
      rating: 5,
      imageSrc: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Loved by <span className="text-blue-600">Thousands</span> of Users
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users have to say about how HumanizeAI has transformed their content creation process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="text-blue-600 font-bold text-xl mr-2">4.9</span>
            <div className="flex items-center mx-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400 mr-1"
                />
              ))}
            </div>
            <span className="text-gray-600">from over 2,000 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;