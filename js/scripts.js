function scrollSection(id){

	var offset = -(document.getElementById('navbar').offsetHeight) + 2;
	var element = document.getElementById(id);
	var yscroll = element.getBoundingClientRect().top + window.pageYOffset + offset;
	window.scrollTo({top:yscroll, behavior:'smooth'});

}

function toggleSkillSection(sectionName){
	var fs = document.getElementById(sectionName + "-text").style.fontSize;
	if(fs != "1rem"){
		document.getElementById(sectionName + "-text").style.fontSize = "1rem";
		document.getElementById(sectionName).innerHTML = "Show Less";
	} else {
		document.getElementById(sectionName + "-text").style.fontSize = 0;
		document.getElementById(sectionName).innerHTML = "Show More";
	}
}