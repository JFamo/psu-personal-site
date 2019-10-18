function scrollSection(id){

	var offset = -(document.getElementById('navbar').offsetHeight) + 2;
	var element = document.getElementById(id);
	var yscroll = element.getBoundingClientRect().top + window.pageYOffset + offset;
	window.scrollTo({top:yscroll, behavior:'smooth'});

}