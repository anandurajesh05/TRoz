import React from 'react';
import { History, Wrench, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container relative z-10 text-center">
                    <h1 className="animate-slide-up">The 2-Stroke Legacy</h1>
                    <p className="animate-slide-up delay-100">
                        For those who know the sound of a crisp exhaust note and the smell of premix in the morning.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="container section-story">
                <div className="story-content glass-panel">
                    <h2>Our Story</h2>
                    <p>
                        TRoz was born out of a garage in 2024, fueled by a simple frustration: finding high-quality, authentic spare parts for legendary 2-stroke machines like the Yamaha RX100, RD350, and Suzuki Shogun was becoming impossible.
                    </p>
                    <p>
                        We realized that these machines aren't just bikes; they are a piece of history, an emotion, and a way of life. We decided to bridge the gap between passion and availability. Today, TRoz is the premier destination for restoration enthusiasts who refuse to let the smoke die out.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="section-mission">
                <div className="container">
                    <h2 className="text-center mb-xl">Why Choose TRoz?</h2>
                    <div className="features-grid">
                        <div className="feature-card glass-panel">
                            <div className="feature-icon"><History size={32} /></div>
                            <h3>Authentic Heritage</h3>
                            <p>We source parts that meet or exceed original factory specifications, keeping your ride true to its roots.</p>
                        </div>
                        <div className="feature-card glass-panel">
                            <div className="feature-icon"><Wrench size={32} /></div>
                            <h3>Expert Knowledge</h3>
                            <p>We don't just sell parts; we ride them. Our team is composed of mechanics and racers who know every bolt.</p>
                        </div>
                        <div className="feature-card glass-panel">
                            <div className="feature-icon"><Truck size={32} /></div>
                            <h3>Fast Shipping</h3>
                            <p>We know you want to get back on the road. We ship everyday to ensure your build never stalls.</p>
                        </div>
                        <div className="feature-card glass-panel">
                            <div className="feature-icon"><ShieldCheck size={32} /></div>
                            <h3>Quality Guarantee</h3>
                            <p>Every piston, gasket, and cable is inspected before it leaves our warehouse. Quality you can trust.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container text-center section-cta">
                <div className="glass-panel cta-panel">
                    <h2>Ready to Restore?</h2>
                    <p>Browse our catalog of premium 2-stroke parts and bring your legend back to life.</p>
                    <Link to="/catalog">
                        <Button size="lg" variant="primary">Shop Now</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
