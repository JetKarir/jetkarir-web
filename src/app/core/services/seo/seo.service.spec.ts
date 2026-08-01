import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    doc = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setPage sets document title', () => {
    service.setPage({ title: 'Test Title', description: 'desc' });
    expect(titleService.getTitle()).toBe('Test Title');
  });

  it('setPage sets description meta tag', () => {
    service.setPage({ title: 'T', description: 'My description' });
    expect(metaService.getTag('name="description"')?.content).toBe('My description');
  });

  it('setPage sets og:title', () => {
    service.setPage({ title: 'OG Title', description: 'desc' });
    expect(metaService.getTag('property="og:title"')?.content).toBe('OG Title');
  });

  it('setPage sets og:site_name to JetKarir', () => {
    service.setPage({ title: 'T', description: 'd' });
    expect(metaService.getTag('property="og:site_name"')?.content).toBe('JetKarir');
  });

  it('setPage sets twitter:card to summary_large_image', () => {
    service.setPage({ title: 'T', description: 'd' });
    expect(metaService.getTag('name="twitter:card"')?.content).toBe('summary_large_image');
  });

  it('setJsonLd injects a script tag with given id', () => {
    service.setJsonLd({ '@type': 'WebPage', name: 'Test' }, 'test-ld');
    const el = doc.getElementById('test-ld');
    expect(el?.tagName).toBe('SCRIPT');
  });

  it('setJsonLd replaces existing script with same id', () => {
    service.setJsonLd({ name: 'First' }, 'page-ld');
    service.setJsonLd({ name: 'Second' }, 'page-ld');
    const all = doc.querySelectorAll('#page-ld');
    expect(all.length).toBe(1);
    expect(JSON.parse((all[0] as HTMLElement).textContent ?? '{}').name).toBe('Second');
  });
});
