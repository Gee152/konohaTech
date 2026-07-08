import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../components/ContactForm'

const defaultProps = {
  isBudgetModalOpen: false,
  onCloseBudgetModal: vi.fn(),
  onOpenBudgetModal: vi.fn(),
}

describe('ContactForm', () => {
  it('renders the CTA section with heading', () => {
    render(<ContactForm {...defaultProps} />)
    expect(screen.getByText('Pronto para tirar sua ideia do papel?')).toBeInTheDocument()
  })

  it('renders the "Solicitar orçamento" button', () => {
    render(<ContactForm {...defaultProps} />)
    expect(screen.getByText('Solicitar orçamento')).toBeInTheDocument()
  })

  it('renders the contact form section', () => {
    render(<ContactForm {...defaultProps} />)
    expect(screen.getByText('Enviar mensagem comercial')).toBeInTheDocument()
  })

  it('renders "Falar no WhatsApp" link', () => {
    render(<ContactForm {...defaultProps} />)
    expect(screen.getByText('Falar no WhatsApp')).toBeInTheDocument()
  })

  it('calls onOpenBudgetModal when "Solicitar orçamento" is clicked', () => {
    const onOpen = vi.fn()
    render(<ContactForm {...defaultProps} onOpenBudgetModal={onOpen} />)
    fireEvent.click(screen.getByText('Solicitar orçamento'))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })
})

describe('ContactForm Wizard Modal', () => {
  it('renders the modal when isBudgetModalOpen is true', () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)
    expect(screen.getByText('Estime o escopo do seu projeto')).toBeInTheDocument()
  })

  it('does not render the modal when isBudgetModalOpen is false', () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={false} />)
    expect(screen.queryByText('Estime o escopo do seu projeto')).not.toBeInTheDocument()
  })

  it('shows step 1 by default with service options', () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)
    expect(screen.getByText('Desenvolvimento Web')).toBeInTheDocument()
    expect(screen.getByText('APIs e Back-end')).toBeInTheDocument()
    expect(screen.getByText('Automações de Processo')).toBeInTheDocument()
    expect(screen.getByText('Inteligência Artificial')).toBeInTheDocument()
    expect(screen.getByText('QA e Testes Automatizados')).toBeInTheDocument()
  })

  it('shows step 2 scale options with updated labels', async () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)
    fireEvent.click(screen.getByText('Desenvolvimento Web'))
    fireEvent.click(screen.getByText('Próxima etapa'))
    await screen.findByText('Qual o estágio operacional atual do projeto?')
    expect(screen.getByText('Iniciando meu negocio')).toBeInTheDocument()
    expect(screen.getByText('Pequena Empresa')).toBeInTheDocument()
    expect(screen.getByText('Empresa em Escala')).toBeInTheDocument()
  })

  it('advances to step 2 when a service is selected and next is clicked', async () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)

    fireEvent.click(screen.getByText('Desenvolvimento Web'))
    fireEvent.click(screen.getByText('Próxima etapa'))

    await waitFor(() => {
      expect(screen.getByText('Qual o estágio operacional atual do projeto?')).toBeInTheDocument()
    })
  })

  it('does not advance to step 2 when no service is selected', async () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)

    fireEvent.click(screen.getByText('Próxima etapa'))

    await waitFor(() => {
      expect(screen.getByText('Selecione pelo menos uma solução acima para prosseguir para o cálculo técnico.')).toBeInTheDocument()
    })
  })

  it('shows step 3 with contact form after selecting service and scale', async () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)

    fireEvent.click(screen.getByText('Desenvolvimento Web'))
    fireEvent.click(screen.getByText('Próxima etapa'))

    await waitFor(() => {
      expect(screen.getByText('Qual o estágio operacional atual do projeto?')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Prosseguir'))

    await waitFor(() => {
      expect(screen.getByText('Inscreva-se para selar sua proposta')).toBeInTheDocument()
      expect(screen.getByText('Solicitar Orçamento Final')).toBeInTheDocument()
    })
  })

  it('calls onCloseBudgetModal when cancel is clicked', () => {
    const onClose = vi.fn()
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} onCloseBudgetModal={onClose} />)

    fireEvent.click(screen.getAllByText('Cancelar')[0])

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe('ContactForm Wizard Budget Calculation', () => {
  it('shows non-zero estimate when services are selected on step 2', async () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)

    fireEvent.click(screen.getByText('Desenvolvimento Web'))
    fireEvent.click(screen.getByText('Próxima etapa'))

    await screen.findByText('Estimativa Operacional Referencial')
    const estimate = await screen.findByText(/R\$\s[\d.]+/)
    expect(estimate).toBeInTheDocument()
    expect(estimate.textContent).not.toMatch(/R\$ 0/)
  })

  it('shows estimate on step 3 summary', async () => {
    render(<ContactForm {...defaultProps} isBudgetModalOpen={true} />)

    fireEvent.click(screen.getByText('Desenvolvimento Web'))
    fireEvent.click(screen.getByText('Próxima etapa'))

    await screen.findByText('Qual o estágio operacional atual do projeto?')

    fireEvent.click(screen.getByText('Prosseguir'))

    const estimate = await screen.findByText(/R\$ [\d.]+ - R\$ [\d.]+/)
    expect(estimate).toBeInTheDocument()
  })
})
