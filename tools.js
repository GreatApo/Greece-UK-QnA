// Function that populates the answers
function populateQuestions(sorted = false){
	let $container = $('#faqAccordion');
	
	// Sort based on score
	if(sorted){
		sortQuestionsByScore();
	}else{
		sortQuestionsById();
	}
	
	// Populate questions
	qna.forEach((l_qna, l_index) => {
		let show = l_qna.show;
		
		if(!show) return;
		if(sorted && l_qna.score == 0) return;
		
		let id = l_qna.id;
		let question = l_qna.q;
		let keywords = l_qna.keywords;
		let answer = l_qna.a;
		let links = l_qna.links;
		
		let headerId = 'question_' + id;
		
		let $item = $('<div />', {
			'class': 'card border-0 wow fadeInUp',
			'data-wow-delay': '0.2s',
			'style': 'visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;',
		}).appendTo($container);
		
		let $item1 = $('<div />',  {
			'class': 'card-header',
			'id': 'question_' + id
		}).appendTo($item);
		
		let $h6 = $('<h6 />',  {
			'class': 'mb-0 collapsed',
			'data-toggle': 'collapse',
			'data-target': '#collapse' + id,
			'aria-expanded': 'true',
			'aria-controls': 'collapse' + id,
			'text': question
		}).appendTo($item1);
		// Open icon
		$('<span />',  {'class': 'bi-chevron-up'}).appendTo($h6);
		
		let $item2 = $('<div />',  {
			'class': 'collapse',
			'id': 'collapse' + id,
			'aria-labelledby': headerId,
			'data-parent': '#faqAccordion'
		}).appendTo($item);
		
		let $card = $('<div />',  {'class': 'card-body'}).appendTo($item2);
		
		let $permLinkObj1 = $('<a />',  {'href':'https://greatapo.github.io/Greece-UK-QnA/#' + headerId, 'class': 'perm-link', 'title': 'Μόνιμος σύνδεσμος ερώτησης #' + id}).appendTo($card);
		$('<i />',  {'class':'bi bi-link-45deg'}).appendTo($permLinkObj1);
		
		let anwserObj = $('<p />',  {'style':'white-space: pre-line', 'text': answer}).appendTo($card);
		
		links.forEach(l_link => {
			anwserObj.html(anwserObj.html().replace(/{([^}]+)}/i,'<a href="' + l_link + '" target="blank">$1<a/>'));
		})
	});
}

// Function to prepare text for comparison (used in search)
function prepareTxt(txt){
	// Convert to lowercase
	txt = txt.toLowerCase();
	// Remove accentuated characters from a string (ά -> α)
	txt = txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	
	return txt;
}

// Sort questions
function sortQuestionsById(){
	qna = qna.sort(function(a,b){
		if(a.id > b.id){return 1;}
		if(a.id < b.id){return -1;}
		return 0;
	});
}
function sortQuestionsByScore(){
	qna = qna.sort(function(a,b){
		if(a.score > b.score){return -1;}
		if(a.score < b.score){return 1;}
		return 0;
	});
}

$(document).ready(function () {
    // Populate questions
	populateQuestions(false);
	
	// Open question if permanent link was used
	if (window.location.hash && window.location.hash.includes("_")){
		let index = parseInt(window.location.hash.split("_")[1]);
		// Scroll to question
		$("html").animate({scrollTop: $(window.location.hash).offset().top - 30},800);
		// Open question
		$('#collapse' + index).collapse('show');
	}
	
	// Search
	$("#search-input").on("keyup", function() {
		let keywords = prepareTxt($("#search-input").val().trim()).split(/[\s,]+/);
		
		// Print the questions without sorting
		if (keywords.length == 0){
			populateQuestions(false);
			return;
		}
		
		// Score each question
		sortQuestionsById();
		qna.forEach((l_qna) => {
			// Ensure qna are prepared for comparison
			if(l_qna.q_prep == undefined){
				l_qna.keywords = prepareTxt(l_qna.keywords);
				l_qna.q_prep = prepareTxt(l_qna.q);
				l_qna.a_prep = prepareTxt(l_qna.a);
			}
			
			var score = 0;
			keywords.forEach((l_keyword) => {
				if ( l_qna.keywords.includes(l_keyword) ){
					score += 2;
				}else if ( l_qna.q_prep.includes(l_keyword) ){
					score++;
				}else if ( l_qna.a_prep.includes(l_keyword) ){
					score++;
				}
			});
			l_qna.score = score;
		});
		
		// Repopulate questions sorted
		$('#faqAccordion').empty();
		populateQuestions(true);
	});
});