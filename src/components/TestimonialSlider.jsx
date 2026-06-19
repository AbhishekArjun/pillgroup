import React, { useState, useEffect } from 'react';

const TestimonialSlider = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="testimonial-slider fade-up">
      <div className="testimonial-slides">
        {testimonials.map((t, idx) => (
          <div key={idx} className={`testimonial-slide ${idx === currentSlide ? 'active' : ''}`}>
            <p className="testimonial-quote">"{t.quote}"</p>
            <span className="testimonial-author">- {t.author}</span>
          </div>
        ))}
      </div>
      <div className="testimonial-controls">
        <button className="testi-prev" aria-label="Previous Testimonial" onClick={prevSlide}>&larr;</button>
        <button className="testi-next" aria-label="Next Testimonial" onClick={nextSlide}>&rarr;</button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
