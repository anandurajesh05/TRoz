import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/UI/Button';
import ProductCard from '../components/UI/Card';
import { useProduct } from '../context/ProductContext';
import { categories } from '../data/mockData';

const Home = () => {
    const { products } = useProduct();
    const featuredProducts = products.slice(0, 4);

    return (
        <div>
            <section className="hero" style={{
                padding: '6rem 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container relative z-10">
                    <h1 className="animate-slide-up" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, var(--color-primary), var(--color-accent))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '800'
                    }}>
                        Keep the Smoke Alive<br />Premium 2-Stroke Parts
                    </h1>
                    <p className="animate-slide-up" style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '2.5rem',
                        maxWidth: '600px',
                        marginInline: 'auto',
                        animationDelay: '0.1s'
                    }}>
                        The ultimate destination for Yamaha RX, RD350, and other legends. Performance parts, restoration kits, and more.
                    </p>
                    <div className="flex justify-center gap-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link to="/catalog">
                            <Button size="lg" variant="primary">Shop Now <ArrowRight size={20} /></Button>
                        </Link>
                        <Link to="/about">
                            <Button size="lg" variant="secondary">Learn More</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mt-lg mb-lg">
                <div className="flex justify-between items-center mb-lg">
                    <h2 style={{ fontSize: '2rem' }}>Featured Products</h2>
                    <Link to="/catalog" className="btn btn-ghost">View All</Link>
                </div>

                <div className="grid grid-cols-4 gap-md" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="section-categories" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 className="text-center mb-lg" style={{ fontSize: '2rem' }}>Browse by Category</h2>
                    <div className="grid gap-md" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                        {categories.map(cat => (
                            <Link to={`/catalog?category=${cat.id}`} key={cat.id} className="glass-panel card-hover" style={{
                                padding: '2rem',
                                textAlign: 'center',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '150px'
                            }}>
                                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
