jQuery(function($) {
	var DetailsPop = function(element) {
		this.$element = $(element);
		this.res_uri = this.$element.data('res-uri');
		this.edit_uri = this.$element.data('submit_uri');
		this.obj_data = this.$element.data('obj_data');
		this.width=this.$element.data("width");

		this.$element.on('click', $.proxy(this.click, this));
	};

	DetailsPop.prototype = {
		constructor : DetailsPop,

		click : function(e) {
			// e.stopPropagation();
			// e.preventDefault();
			var modal = $('#detail-modal');
			var el = this.$element;
			if (!modal.length) {
				modal = $('<div id="detail-modal" class="modal container hide fade quick-form" role="dialog"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3>'
						+ el.attr('title')
						+ '</h3></div><div class="modal-body"></div>'
						+ '<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button></div></div>');
						//+ '<a class="btn btn-submit btn-primary btn-submit"><i class="icon-pencil"></i> 保存</a></div></div>');
				$('body').append(modal);
			}
			if ($("#obj_data").length){
				$("#obj_data").val(this.obj_data);
			}else{
				$("#detail-modal").append($("<input id='obj_data' type='hidden'>").val(this.obj_data));
			}
			
			modal.removeAttr("style");
			if (this.width){
				modal.width(this.width);
			}
			
			modal.find('.btn-submit').attr('href', this.submit_uri);
			modal
					.find('.modal-body')
					.html(
							'<div class="progress progress-striped active" style="width:50%; margin: 10px auto;"><div class="bar" style="width: 100%;"></div></div>');
			modal.find('.modal-body').load(
							this.res_uri + '?_format=html',
							function(response, status, xhr) {
								if (status == "error") {
									var msg = "加载页面出错: ";
									modal
											.find('.modal-body')
											.html(
													msg
															+ xhr.status
															+ " "
															+ (typeof xhr === 'string' ? xhr
																	: xhr.responseText
																			|| xhr.statusText
																			|| 'Unknown error!'));
								}
							});
			modal.modal({backdrop:'static'});
		}
	};

	$.fn.detail = function() {
		return this.each(function() {
			var $this = $(this), data = $this.data('details');
			if (!data) {
				$this.data('details', (data = new DetailsPop(this)));
			}
		});
	};

	$(function() {
		$('.details-handler').detail();
	});
});