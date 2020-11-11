//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: {
        assets: undefined,
      },
      responsiveSwipers: {
        showcaseSwiper: {
          instances: [],
          enableOn: 768,
        },
        stepsSwiper: {
          instances: [],
          enableOn: 768,
        },
      },
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.initSwipers();
        this.initSwiperDataTree();
        this.initResponsiveSwipers();
        this.listenResize();
      }
    },
    reinit: function() {
      // without resize listeners double check
      this.initSwipers();
      this.initSwiperDataTree();
      this.initResponsiveSwipers();
    },
    update: function(selector) {
      var $swiper;
      // if selector passed - update only with selector
      if (selector) {
        $swiper = $(`${selector}.swiper-container-initialized`);
      } else {
        $swiper = $('.swiper-container-initialized');
      }

      if ($swiper.length > 0) {
        $swiper.each(function(i, swiper) {
          $(swiper)[0].swiper.update();
        });
      }
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function() {
      var $page = $('.page').last();

      const buildProps = name => {
        return {
          watchOverflow: true,
          setWrapperSize: false,
          slidesPerView: 'auto',
          normalizeSlideIndex: false,
          freeMode: true,
          pagination: {
            el: `.swiper-${name}-pagination`,
            type: 'bullets',
            clickable: true,
          },
        };
      };

      var buildSwiper = (name, eProps) => {
        let props = buildProps(name);

        const el = $(`.js-swiper-${name}`);
        if (!el) return;

        // build props from data-
        let cProps = {};
        const dataBefore = el.data('offset-before');
        const dataAfter = el.data('offset-after');
        if (dataBefore) {
          cProps = {
            slidesOffsetBefore: dataBefore,
          };
        }
        if (dataBefore) {
          cProps = {
            ...cProps,
            slidesOffsetAfter: dataAfter,
          };
        }

        let swiper = new Swiper(`.js-swiper-${name}:not(.swiper-container-initialized)`, {
          ...props,
          ...eProps,
          ...cProps,
        });
        return swiper;
      };

      // ASSETS
      this.data.swipers.assets = buildSwiper('assets', {
        spaceBetween: 20,
        breakpoints: {
          568: {
            spaceBetween: 40,
          },
        },
        // freeModeSticky: true,
      });
    },
    initSwiperDataTree: function() {
      var showcaseSwiper = '.js-swiper-showcase';
      if ($(showcaseSwiper).length > 0) {
        this.initSwiperTree(showcaseSwiper, 'showcaseSwiper');
      }

      var stepsSwiper = '.js-swiper-steps';
      if ($(stepsSwiper).length > 0) {
        this.initSwiperTree(stepsSwiper, 'stepsSwiper');
      }
    },
    initResponsiveSwipers: function() {
      var showcaseSwiper = '.js-swiper-showcase';
      if ($(showcaseSwiper).length > 0) {
        this.responsiveSwiperConstructor(showcaseSwiper, 'showcaseSwiper', {
          watchOverflow: true,
          setWrapperSize: false,
          spaceBetween: 0,
          slidesPerView: 'auto',
          spaceBetween: 0,
          freeMode: false,
          pagination: {
            el: '.swiper-showcase-pagination',
            type: 'bullets',
            clickable: true,
          },
        });
      }

      var stepsSwiper = '.js-swiper-steps';
      if ($(stepsSwiper).length > 0) {
        this.responsiveSwiperConstructor(stepsSwiper, 'stepsSwiper', {
          watchOverflow: true,
          setWrapperSize: false,
          spaceBetween: 0,
          slidesPerView: 'auto',
          spaceBetween: 0,
          freeMode: false,
          autoHeight: true,
          pagination: {
            el: '.swiper-steps-pagination',
            type: 'bullets',
            clickable: true,
          },
        });
      }
    },
    initSwiperTree: function(selector, name) {
      var _this = this;
      _this.data.responsiveSwipers[name].instances = [];
      $(selector).each(function(i, sw) {
        _this.data.responsiveSwipers[name].instances.push(undefined);
      });
    },
    responsiveSwiperConstructor: function(selector, objName, options) {
      var dataObj = this.data.responsiveSwipers[objName];

      $(selector).each(function(idx, element) {
        if (window.innerWidth <= dataObj.enableOn) {
          if (dataObj.instances[idx] === undefined) {
            dataObj.instances[idx] = new Swiper(element, options);
          }
        } else {
          if (dataObj.instances[idx] !== undefined) {
            dataObj.instances[idx].destroy(true, true);
            dataObj.instances[idx] = undefined;
          }
        }
      });

      this.data.responsiveSwipers[objName] = dataObj;
    },

    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
