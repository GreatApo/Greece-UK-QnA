$(document).ready(function () {
    var $container = $('#faqAccordion');
	
	qna.forEach((l_qna, l_index) => {
		let show = l_qna.show;
		
		if(!show) return;
		
		let question = l_qna.q;
		let keywords = l_qna.keywords;
		let answer = l_qna.a;
		let links = l_qna.links;
		
		let headerId = 'question_' + l_index;
		
		let $item = $('<div />', {
			'class': 'card border-0 wow fadeInUp',
			'data-wow-delay': '0.2s',
			'style': 'visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;',
		}).appendTo($container);
		
		let $item1 = $('<div />',  {
			'class': 'card-header',
			'id': 'question_' + l_index
		}).appendTo($item);
		
		let $h6 = $('<h6 />',  {
			'class': 'mb-0 collapsed',
			'data-toggle': 'collapse',
			'data-target': '#collapse' + l_index,
			'aria-expanded': 'true',
			'aria-controls': 'collapse' + l_index,
			'text': question
		}).appendTo($item1);
		// Open icon
		$('<span />',  {'class': 'bi-chevron-up'}).appendTo($h6);
		
		let $item2 = $('<div />',  {
			'class': 'collapse',
			'id': 'collapse' + l_index,
			'aria-labelledby': headerId,
			'data-parent': '#faqAccordion'
		}).appendTo($item);
		
		let $card = $('<div />',  {'class': 'card-body'}).appendTo($item2);
		
		let $permLinkObj1 = $('<a />',  {'href':'https://greatapo.github.io/Greece-UK-QnA/#' + headerId, 'class': 'perm-link', 'title': 'Μόνιμος σύνδεσμος ερώτησης #' + (l_index + 1)}).appendTo($card);
		$('<i />',  {'class':'bi bi-link-45deg'}).appendTo($permLinkObj1);
		
		let anwserObj = $('<p />',  {'style':'white-space: pre-line', 'text': answer}).appendTo($card);
		
		links.forEach(l_link => {
			anwserObj.html(anwserObj.html().replace(/{([^}]+)}/i,'<a href="' + l_link + '" target="blank">$1<a/>'));
		})
	});
	
	// Open question if permanent link was used
	if (window.location.hash && window.location.hash.includes("_")){
		let index = parseInt(window.location.hash.split("_")[1]);
		// Scroll to question
		$("html").animate({scrollTop: $(window.location.hash).offset().top - 30},800);
		// Open question
		$('#collapse' + index).collapse('show');
	}

});
