$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  $('div.items img:first-child').addClass('active');
  this.$el.on('click', '.slide-right', this.slideRight.bind(this));
  this.$el.on('click', '.slide-left', this.slideLeft.bind(this));
};

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) {
    return;
  }
  this.transitioning = true;
  var that = this;
  
  var $imgs = this.$el.find('img')
  var $activeItem = $imgs.eq(this.activeIdx);
  if (dir === -1) {
    var dirName = "right";
    var oppName = "left";
  } else {
    var dirName = "left";
    var oppName = "right";
  }

  $activeItem.addClass(dirName);

  this.wrapIndex(dir, $imgs.length)

  var $newActiveItem = $imgs.eq(this.activeIdx);
  $newActiveItem.addClass('active').addClass(oppName);
  setTimeout(function () {
    $newActiveItem.removeClass(oppName)
  }, 0);

  $newActiveItem.one("transitionend", function () {
    $activeItem.removeClass(dirName);
    $activeItem.removeClass("active");
    that.transitioning = false;
  });
}

$.Carousel.prototype.wrapIndex = function (dir, numItems) {
  if (this.activeIdx + dir === -1) {
    this.activeIdx = numItems - 1;
  }
  else {
    this.activeIdx = (this.activeIdx + dir) % numItems;
  }
}

$.Carousel.prototype.slideRight = function (event) {
  this.slide(-1);
};

$.Carousel.prototype.slideLeft = function (event) {
  this.slide(1);
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
