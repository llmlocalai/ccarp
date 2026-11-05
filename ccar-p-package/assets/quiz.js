function revealQuiz(btn, correctId){
  var quiz = btn.closest('.quiz');
  var opts = quiz.querySelectorAll('.opt');
  opts.forEach(function(o){
    if(o.dataset.id === correctId){ o.classList.add('correct'); }
  });
  var rat = quiz.querySelector('.rationale');
  if(rat) rat.classList.add('show');
  btn.disabled = true;
  btn.textContent = "Revealed";
}
function pickOpt(el, correctId){
  var quiz = el.closest('.quiz');
  var opts = quiz.querySelectorAll('.opt');
  opts.forEach(function(o){ o.classList.remove('correct','wrong'); });
  if(el.dataset.id === correctId){ el.classList.add('correct'); }
  else {
    el.classList.add('wrong');
    opts.forEach(function(o){ if(o.dataset.id===correctId) o.classList.add('correct'); });
  }
  var rat = quiz.querySelector('.rationale');
  if(rat) rat.classList.add('show');
}
