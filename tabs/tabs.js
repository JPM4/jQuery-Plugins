$.Tabs = function (el) {
  $("div.tab-pane:first-child").addClass("active");
  $("li:first-child a").addClass("active");
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = $(this.$contentTabs.find(".active"));
  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (event) {
  event.preventDefault();

  $("a.active").removeClass("active");
  var $targetLink = $(event.currentTarget);
  $targetLink.addClass("active");

  this.$activeTab.removeClass("active").addClass("transitioning");
  var that = this

  this.$activeTab.one('transitionend', function() {
    that.$activeTab.removeClass("transitioning");
    var paneId = $targetLink.attr('href');
    var $targetTabPane = $(paneId);
    that.$activeTab = $targetTabPane;
    that.$activeTab.addClass("active transitioning");

    setTimeout(function () {
      that.$activeTab.removeClass("transitioning");
    }, 0);
  });
};


$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
