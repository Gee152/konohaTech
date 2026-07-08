import { describe, it, expect } from 'vitest'
import {
  DATA,
  SERVICES,
  PORTFOLIO,
  TESTIMONIALS,
  PROCESS_STEPS,
  TECH_BADGES,
} from '../data'

describe('DATA', () => {
  it('has exactly one entry', () => {
    expect(DATA).toHaveLength(1)
  })

  it('has all required fields', () => {
    const data = DATA[0]
    expect(data.email).toBeTruthy()
    expect(data.phone).toBeTruthy()
    expect(data.address).toBeTruthy()
    expect(data.about).toBeTruthy()
    expect(data.socialMedia).toBeTruthy()
    expect(data.socialMedia.whatsapp).toBeTruthy()
    expect(data.socialMedia.linkedin).toBeTruthy()
    expect(data.socialMedia.github).toBeTruthy()
    expect(data.socialMedia.instagram).toBeTruthy()
    expect(data.socialMedia.tiktok).toBeTruthy()
  })

  it('has valid email format', () => {
    expect(DATA[0].email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('has a non-empty WhatsApp number', () => {
    expect(DATA[0].socialMedia.whatsapp.length).toBeGreaterThanOrEqual(10)
  })
})

describe('SERVICES', () => {
  it('has at least one service', () => {
    expect(SERVICES.length).toBeGreaterThan(0)
  })

  it('each service has all required fields', () => {
    for (const service of SERVICES) {
      expect(service.id).toBeTruthy()
      expect(service.title).toBeTruthy()
      expect(service.description).toBeTruthy()
      expect(service.features).toBeInstanceOf(Array)
      expect(service.features.length).toBeGreaterThan(0)
      expect(service.iconName).toBeTruthy()
    }
  })

  it('all service IDs are unique', () => {
    const ids = SERVICES.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each service has at least 2 features', () => {
    for (const service of SERVICES) {
      expect(service.features.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('all iconNames are non-empty strings', () => {
    for (const service of SERVICES) {
      expect(service.iconName).toBeTruthy()
      expect(typeof service.iconName).toBe('string')
    }
  })
})

describe('PORTFOLIO', () => {
  it('has at least one project', () => {
    expect(PORTFOLIO.length).toBeGreaterThan(0)
  })

  it('each project has all required fields', () => {
    for (const project of PORTFOLIO) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.category).toBeTruthy()
      expect(project.tags).toBeInstanceOf(Array)
      expect(project.image).toBeTruthy()
    }
  })

  it('all project IDs are unique', () => {
    const ids = PORTFOLIO.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each project has at least one tag', () => {
    for (const project of PORTFOLIO) {
      expect(project.tags.length).toBeGreaterThan(0)
    }
  })

  it('each project has an image (non-empty string)', () => {
    for (const project of PORTFOLIO) {
      expect(project.image).toBeTruthy()
      expect(typeof project.image).toBe('string')
    }
  })
})

describe('TESTIMONIALS', () => {
  it('has at least one testimonial', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0)
  })

  it('each testimonial has all required fields', () => {
    for (const t of TESTIMONIALS) {
      expect(t.id).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.role).toBeTruthy()
      expect(t.company).toBeTruthy()
      expect(t.comment).toBeTruthy()
      expect(t.avatar).toBeTruthy()
    }
  })

  it('all testimonial IDs are unique', () => {
    const ids = TESTIMONIALS.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each testimonial has a non-empty comment', () => {
    for (const t of TESTIMONIALS) {
      expect(t.comment.length).toBeGreaterThan(10)
    }
  })
})

describe('PROCESS_STEPS', () => {
  it('has exactly 5 steps', () => {
    expect(PROCESS_STEPS).toHaveLength(5)
  })

  it('steps are in sequential order starting from 1', () => {
    for (let i = 0; i < PROCESS_STEPS.length; i++) {
      expect(PROCESS_STEPS[i].stepNumber).toBe(i + 1)
    }
  })

  it('each step has title and description', () => {
    for (const step of PROCESS_STEPS) {
      expect(step.title).toBeTruthy()
      expect(step.description).toBeTruthy()
    }
  })
})

describe('TECH_BADGES', () => {
  it('has at least one badge', () => {
    expect(TECH_BADGES.length).toBeGreaterThan(0)
  })

  it('each badge has name and valid category', () => {
    const validCategories = ['frontend', 'backend', 'devops', 'database', 'testing']
    for (const badge of TECH_BADGES) {
      expect(badge.name).toBeTruthy()
      expect(validCategories).toContain(badge.category)
    }
  })

  it('all badge names are unique', () => {
    const names = TECH_BADGES.map(b => b.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('has at least one badge per major category', () => {
    const categories = TECH_BADGES.map(b => b.category)
    expect(categories).toContain('frontend')
    expect(categories).toContain('backend')
  })
})
