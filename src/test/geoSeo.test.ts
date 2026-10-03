import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Infraestrutura GEO & SEO Técnico', () => {
  const publicDir = path.resolve(__dirname, '../../public');
  const docsDir = path.join(publicDir, 'docs');
  const indexHtmlPath = path.resolve(__dirname, '../../index.html');

  describe('Manifesto llms.txt (GEO / RAG)', () => {
    it('existe e possui cabeçalho com proposta de valor', () => {
      const llmsPath = path.join(publicDir, 'llms.txt');
      expect(fs.existsSync(llmsPath)).toBe(true);

      const content = fs.readFileSync(llmsPath, 'utf8');
      expect(content).toContain('KonohaTech — Engenharia de Software');
      expect(content).toContain('Código puro, entregas blindadas');
      expect(content).toContain('React 19');
    });

    it('contém todas as rotas canônicas em Markdown para a pasta docs/', () => {
      const content = fs.readFileSync(path.join(publicDir, 'llms.txt'), 'utf8');
      expect(content).toContain('docs/sobre.md');
      expect(content).toContain('docs/servicos.md');
      expect(content).toContain('docs/cases.md');
      expect(content).toContain('docs/biolinks.md');
      expect(content).toContain('docs/contato.md');
    });

    it('contém notas factuais com CNPJ e localização para agentes de IA', () => {
      const content = fs.readFileSync(path.join(publicDir, 'llms.txt'), 'utf8');
      expect(content).toContain('45.109.825/0001-92');
      expect(content).toContain('Recife, Pernambuco');
      expect(content).toContain('+55 81 98777-2234');
    });
  });

  describe('Governança robots.txt', () => {
    it('permite acesso a docs, llms.txt e bots de IA com regras explícitas', () => {
      const robotsPath = path.join(publicDir, 'robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);

      const content = fs.readFileSync(robotsPath, 'utf8');
      expect(content).toContain('Allow: /docs/');
      expect(content).toContain('Allow: /llms.txt');
      expect(content).toContain('User-agent: PerplexityBot');
      expect(content).toContain('User-agent: OAI-SearchBot');
      expect(content).toContain('User-agent: ChatGPT-User');
    });

    it('bloqueia scrapers predatórios de treinamento massivo', () => {
      const content = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');
      expect(content).toContain('User-agent: Bytespider');
      expect(content).toContain('User-agent: CCBot');
      expect(content).toContain('Sitemap: https://gee152.github.io/konohaTech/sitemap.xml');
    });
  });

  describe('Mapa Canônico sitemap.xml', () => {
    it('possui XML bem formatado com as rotas principais', () => {
      const sitemapPath = path.join(publicDir, 'sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);

      const content = fs.readFileSync(sitemapPath, 'utf8');
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain('<loc>https://gee152.github.io/konohaTech/</loc>');
      expect(content).toContain('<loc>https://gee152.github.io/konohaTech/?page=links</loc>');
      expect(content).toContain('<loc>https://gee152.github.io/konohaTech/docs/sobre.md</loc>');
      expect(content).toContain('<loc>https://gee152.github.io/konohaTech/docs/servicos.md</loc>');
      expect(content).toContain('<loc>https://gee152.github.io/konohaTech/docs/cases.md</loc>');
    });
  });

  describe('Base Factual Markdown (public/docs/)', () => {
    const requiredDocs = ['sobre.md', 'servicos.md', 'cases.md', 'biolinks.md', 'contato.md'];

    it.each(requiredDocs)('arquivo %s existe e contém dados estruturados', (filename) => {
      const filePath = path.join(docsDir, filename);
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf8');
      expect(content.length).toBeGreaterThan(200);
      expect(content).toContain('KonohaTech');
    });

    it('cases.md documenta os 3 projetos reais do portfólio', () => {
      const casesContent = fs.readFileSync(path.join(docsDir, 'cases.md'), 'utf8');
      expect(casesContent).toContain('Psicólogo Heron Silveira');
      expect(casesContent).toContain('Fisioterapeuta Ana Carolina');
      expect(casesContent).toContain('EaOliveira Corretora de Seguros');
    });

    it('contato.md documenta o CNPJ oficial e canais de contato', () => {
      const contatoContent = fs.readFileSync(path.join(docsDir, 'contato.md'), 'utf8');
      expect(contatoContent).toContain('45.109.825/0001-92');
      expect(contatoContent).toContain('contatokonohatech@gmail.com');
      expect(contatoContent).toContain('558187772234');
    });
  });

  describe('Metadados Semânticos & Schema.org (index.html)', () => {
    it('possui tags canônicas, OpenGraph e Twitter Cards', () => {
      const html = fs.readFileSync(indexHtmlPath, 'utf8');
      expect(html).toContain('<link rel="canonical" href="https://gee152.github.io/konohaTech/" />');
      expect(html).toContain('property="og:title"');
      expect(html).toContain('property="og:image"');
      expect(html).toContain('name="twitter:card"');
    });

    it('possui JSON-LD ProfessionalService válido com CNPJ e localização', () => {
      const html = fs.readFileSync(indexHtmlPath, 'utf8');
      const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      expect(match).not.toBeNull();

      const schema = JSON.parse(match![1]);
      expect(schema['@context']).toBe('https://schema.org');
      const profService = schema['@graph']
        ? schema['@graph'].find((item: any) => item['@type'] === 'ProfessionalService')
        : schema;

      expect(profService).toBeDefined();
      expect(profService['@type']).toBe('ProfessionalService');
      expect(profService.name).toBe('KonohaTech');
      expect(profService.taxID).toBe('45.109.825/0001-92');
      expect(profService.address.addressLocality).toBe('Recife');
      expect(profService.address.addressRegion).toBe('PE');
      expect(profService.address.addressCountry).toBe('BR');
      expect(profService.areaServed).toBe('Global');
    });
  });
});
