function toggleNav() {
  document.getElementById('navmenu').classList.toggle('open');
}

var roles = ['Web Developer', 'DSA Enthusiast', 'Frontend Developer', 'CSE Student', 'Problem Solver'];
var ri = 0, ci = 0, del = false;
var typer = document.getElementById('typer');

function type() {
  var word = roles[ri];
  if (!del) {
    typer.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { del = true; setTimeout(type, 1500); return; }
  } else {
    typer.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 55 : 95);
}

type();

function filterP(btn, cat) {
  document.querySelectorAll('.fbtn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.pcard').forEach(function(card) {
    var cats = card.getAttribute('data-cat');
    card.style.display = (cat === 'all' || cats.includes(cat)) ? 'block' : 'none';
  });
}

function saveNote() {
  var txt = document.getElementById('ntxt').value.trim();
  if (!txt) { alert('Please write something first.'); return; }
  var notes = JSON.parse(localStorage.getItem('vs-notes') || '[]');
  notes.push(txt);
  localStorage.setItem('vs-notes', JSON.stringify(notes));
  document.getElementById('ntxt').value = '';
  loadNotes();
}

function loadNotes() {
  var notes = JSON.parse(localStorage.getItem('vs-notes') || '[]');
  var list  = document.getElementById('nlist');
  list.innerHTML = '';
  notes.forEach(function(note, i) {
    var li = document.createElement('li');
    li.innerHTML = '<span>' + note + '</span><button onclick="deleteNote(' + i + ')">Delete</button>';
    list.appendChild(li);
  });
}

function deleteNote(i) {
  var notes = JSON.parse(localStorage.getItem('vs-notes') || '[]');
  notes.splice(i, 1);
  localStorage.setItem('vs-notes', JSON.stringify(notes));
  loadNotes();
}

function sendMsg(event) {
  event.preventDefault();
  var name  = document.getElementById('cname').value.trim();
  var email = document.getElementById('cemail').value.trim();
  var msg   = document.getElementById('cmsg').value.trim();
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var valid = true;

  ['e1','e2','e3','ok'].forEach(function(id) { document.getElementById(id).textContent = ''; });

  if (!name)                   { document.getElementById('e1').textContent = 'Name is required.';         valid = false; }
  if (!email)                  { document.getElementById('e2').textContent = 'Email is required.';        valid = false; }
  else if (!regex.test(email)) { document.getElementById('e2').textContent = 'Enter a valid email.';      valid = false; }
  if (!msg)                    { document.getElementById('e3').textContent = 'Message cannot be empty.';  valid = false; }

  if (valid) {
    document.getElementById('ok').textContent = '✓ Message sent! I will get back to you soon.';
    document.getElementById('cform').reset();
  }
}

loadNotes();
