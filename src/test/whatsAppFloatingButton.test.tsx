import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

describe('WhatsAppFloatingButton Component', () => {
  it('renders floating button with correct accessibility attributes', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByRole('link', {
      name: /iniciar conversa no whatsapp com a konohatech/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('generates the default WhatsApp URL with KonohaTech phone', () => {
    render(<WhatsAppFloatingButton />);
    const link = screen.getByRole('link', {
      name: /iniciar conversa no whatsapp com a konohatech/i,
    });
    expect(link.getAttribute('href')).toContain('https://api.whatsapp.com/send?phone=558187772234');
    expect(link.getAttribute('href')).toContain('text=Ol%C3%A1%20KonohaTech');
  });

  it('supports custom phone number and custom message', () => {
    render(
      <WhatsAppFloatingButton
        phone="5581999998888"
        message="Mensagem de teste personalizada"
      />
    );
    const link = screen.getByRole('link', {
      name: /iniciar conversa no whatsapp com a konohatech/i,
    });
    expect(link.getAttribute('href')).toContain('phone=5581999998888');
    expect(link.getAttribute('href')).toContain('text=Mensagem%20de%20teste%20personalizada');
  });

  it('renders online status badge and tooltip copy', () => {
    render(<WhatsAppFloatingButton />);
    expect(screen.getByText('Fale Conosco no WhatsApp')).toBeInTheDocument();
    expect(screen.getByTitle('Atendimento Online')).toBeInTheDocument();
  });
});
