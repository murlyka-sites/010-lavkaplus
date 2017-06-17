$(document).ready(function() {

	$('.catalog__more').click(function() {
		var $container = $($(this).data('container'));

		$container.toggleClass('catalog__items_open');
	});

	$('.catalog__item-count .select-count').change(function() {
		var $parent = $(this).closest('.catalog__item'),
				$buy = $parent.find('.catalog__item-buy .btn-buy');

		$buy.text(($parent.data('price') * $(this).val()) + 'р')
		$parent.data('count', $(this).val()).attr("data-count", $(this).val());
	});

	$(".nav-top__icon").click(function() {
		$(this).toggleClass('nav-top__icon_open');
		$(".nav-top").toggleClass('nav-top_open');

		$("body").toggleClass('body-open-menu');
	});

	$(".header__search-icon").click(function () {
		$(".header__search").toggleClass("header__search_open")
	});

	var totalPrice = 0,
			totalCount = 0;

	function changeTotalPrice() {
		$(".basket__price_val, .basket-total").text(totalPrice);
	}

	function changeTotalCount() {
		$(".basket__count_val").text(totalCount);
	}

	function basketCountIncrement() {
		totalCount++;
	}

	function basketCountClear() {
		totalCount = 0;
	}

	function basketPriceSum(plus) {
		totalPrice += plus;
	}

	function basketPriceClear() {
		totalPrice = 0;
	}

	function moveBasket($item) {
		$item = $("<div class='popup__grid'></div>").append($item);
		var count = +$item.find('.catalog__item').data('count');

		$item.find("option:contains('" + count + "')").attr("selected", "selected");
		
		$(".basket-list").append($item);

		$(".basket-list").removeClass("popup__items_empty");
	}

	function basketClear() {
		$(".basket-list").empty();
		$(".basket-list").addClass("popup__items_empty");

		basketCountClear();
		basketPriceClear();
		changeTotalCount();
		changeTotalPrice();
	}

	$(".catalog__item-btn-buy").click(function() {
		
		var $parent = $(this).closest('.catalog__item'),
				$buy = $parent.find('.catalog__item-buy .btn-buy'),
				count = +$parent.data("count");

		basketCountIncrement();
		changeTotalCount();

		basketPriceSum(+$parent.data('price') * count);
		changeTotalPrice();

		moveBasket($parent.clone());

		$(".basket__icon").animate({scale: "1.25"}, 250);
		$(".basket__icon").animate({scale: "1"}, 250);
	});

	// $("img.lazy").lazyload({
	// });

	$(".fancy").fancybox({
		padding: 0
	});

	$('#basket').on('change', '.catalog__item .select-count', function(){
		var $parent = $(this).closest(".catalog__item"),
				$buy = $parent.find('.catalog__item-buy .btn-buy'),
				diff = (+$(this).val() - +$parent.data("count")) * ($parent.data('price'));

		$buy.text(($parent.data('price') * $(this).val()) + 'р')
		$parent.data('count', $(this).val());

		basketPriceSum(diff);
		changeTotalPrice();
	});

	$('.clear-basket').click(function() {
		basketClear();
		$.fancybox.close();
		return false;
	});


	$(".input_phone").mask("+7 (999) 999-99-99");

	$("form").ajaxForm({
		url: "index.html",

		success: function(responseText, statusText, xhr, $form) {
			$.fancybox.close();
			$form.trigger("reset");
			$.fancybox("#success", {padding: 0});
		}
	});

	// $(".nav__icon").click(function() {
	// 	$(this).toggleClass('nav__icon_open');
	// 	$(".nav__list").toggleClass('nav__list_open');
	// });

	$.scrollUp("white", "#6fb33b");
});