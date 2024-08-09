import { CarouselModule } from 'primeng/carousel';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'air-site';

  responsiveCarouselOptions = [
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
  ];
  brandsCarousel = [
    {
      image: 'images/logo-gree.png',
      name: 'Logo Gree',
    },
    {
      image: 'images/logo-daikin.png',
      name: 'Logo Daikin',
    },
    {
      image: 'images/logo-samsung.png',
      name: 'Logo Samsung',
    },
    {
      image: 'images/logo-lg.png',
      name: 'Logo LG',
    },
    {
      image: 'images/logo-midea.png',
      name: 'Logo Midea',
    },
    {
      image: 'images/logo-carrier.png',
      name: 'Logo Carrier',
    },
  ];
  innerWidth = document.documentElement.clientWidth;
  innerHeight = document.documentElement.clientHeight;
  touchStart: Touch | undefined;
  scrollPage = 'transform: translate3d(0px, 0px, 0px);';
  heightScrolled = 0;
  section = 0;

  ngOnInit(): void {
    this.setViewHeight();
    window.addEventListener('resize', () => {
      this.innerHeight = document.documentElement.clientHeight;
      let viewHeight = document.documentElement.clientHeight * 0.01;
      this.setViewHeight(viewHeight);
    });
    document.addEventListener("touchstart", (event) => {
      this.touchStart = event.changedTouches[0];
    });
    document.addEventListener("touchend", (event) => {
      if (this.touchStart?.clientY! > event.changedTouches[0].clientY) {
        this.scrollDown();
      } else {
        this.scrollUp();
      }
    });
    document.addEventListener('mousewheel',(event) => this.onScroll(event),false);
    document.addEventListener('DOMMouseScroll',(event) => this.onScroll(event),false);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'Space' || event.key === 'PageDown') {
        this.scrollDown();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
        this.scrollUp();
      }
    }, false);
  }

  onScroll(event: any) {
    event.deltaY > 0 ? this.scrollDown() : this.scrollUp();
  }

  scrollDown() {
    if (this.section <= 3) {
      this.heightScrolled += this.innerHeight;
      this.section += 1;
    }
    this.setScrollPage();
  }

  scrollUp() {
    if (this.section > 0) {
      this.heightScrolled -= this.innerHeight;
      this.section -= 1;
    }
    this.setScrollPage();
  }

  scrollToSection(section: number) {
    this.section = section;
    this.heightScrolled = this.innerHeight * section;
    this.setScrollPage();
  }

  setViewHeight(viewHeight = this.innerHeight * 0.01) {
    document.documentElement.style.setProperty('--vh', `${viewHeight}px`);
  }

  setScrollPage() {
    this.scrollPage = `transform: translate3d(0px, -${this.heightScrolled}px, 0px);`;
  }
}
