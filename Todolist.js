let addcardbtn = document.getElementById('addbtn');
let container_div = document.getElementById('container');

addcardbtn.addEventListener('click',()=>{
	makeitem()
})

// add event for addin new task in current div
window.addEventListener('click',(event)=>{
	if(event.target.classList == 'add-task-btn') {
		console.log('req for new taks')
		let addtaksbtn = document.querySelector('#' + event.target.id)
		let current_card = event.target.parentNode
		// console.log(current_card)
		// let currentcard = document.querySelector('#')
		addtask(current_card, addtaksbtn)
	}
})


// function for make new card
function makeitem(){
	let no_of_cards   = (document.querySelectorAll('.card')).length;
	let newcard       = document.createElement('div')
	newcard.classList = 'card';
	newcard.id        = 'card' + no_of_cards //making unique id for evry card 
	newcard.innerHTML = '<h2>TO DO</h2>';

	let addtaksbtn = document.createElement('button');
	addtaksbtn.id = 'addtaksbtn' + no_of_cards;
	addtaksbtn.classList = 'add-task-btn';
	addtaksbtn.innerText = '+'
	addtaksbtn.disabled = true
	
	container_div.append(newcard)
	newcard.append(addtaksbtn)
	addtask(newcard,addtaksbtn)  // add input box in evry task
}

//for making button savve and cancel
function addbuttons(newcard){
	const savebtn = document.createElement('button');
	savebtn.innerText = 'Save'
	savebtn.id = 'savebtn'
	savebtn.classList = 'btnstyle'
	newcard.append(savebtn)

	const cancelbtn = document.createElement('button');
	cancelbtn.innerText = 'cancel'
	cancelbtn.id = 'cancelbtn'
	cancelbtn.classList = 'btnstyle'
	cancelbtn.style.backgroundColor = 'red'
	newcard.append(cancelbtn)
}

// remove btn on save and cancel
function removebtn(taskinp, savebtn, cancelbtn, addcardbtn,addtaksbtn){
	taskinp.remove()
	savebtn.remove()
	cancelbtn.remove()
	addcardbtn.disabled = false
	addtaksbtn.disabled = false
}

// function for adding new task 
function addtask(newcard,addtaksbtn){
	addcardbtn.disabled = true
	let taskinp  = document.createElement('input')
	taskinp.type = 'text';
	// console.log(newcard.id)
	newcard.append(taskinp);
	addbuttons(newcard);
	let savebtn   = document.getElementById('savebtn');
	let cancelbtn = document.getElementById('cancelbtn')
	
	savebtn.addEventListener('click',()=>{
		console.log('save btn clicked') /// for debuging 
		if (taskinp.value.length !== 0 ){
		let no_of_labels      = document.querySelectorAll('label').length
		let tasklabel         = document.createElement('label')
		tasklabel.classList   = 'label';
		tasklabel.id          = 'label'+ no_of_labels
		tasklabel.textContent = taskinp.value;

		removebtn(taskinp, savebtn, cancelbtn, addcardbtn,addtaksbtn); // this will remove btns , input 
		newcard.append(tasklabel)
		}
		else{
			alert ('Please add something in task')
		}
	})	

	// event for cancel btn 
	cancelbtn.addEventListener('click', (event)=>{
		console.log('cancel btn is clicked')
		let no_of_labels = document.querySelectorAll('#' + event.target.parentNode.id + ' .label').length

		if(no_of_labels === 0){
			console.log('0 lbl')
			newcard.remove()
			addcardbtn.disabled = false
		}
		removebtn(taskinp, savebtn, cancelbtn); // this will remove btns , input 
	})
}

// for edit label  click on this 
window.addEventListener('click', (event)=>{
	if(event.target.classList == 'label'){
		let tasklabel = document.querySelector('#' + event.target.id) //for getting label from id
		let taskinp   = document.createElement('input')
		taskinp.type  = 'text';
		taskinp.id    = event.target.id
		taskinp.value = tasklabel.innerText;
		tasklabel.parentNode.replaceChild(taskinp, tasklabel)

		taskinp.addEventListener('keypress', (event)=>{
			if(event.key == 'Enter'){
				console.log('you press enter');
				if (taskinp.value.length !== 0 ){
					let tasklabel         = document.createElement('label');
					tasklabel.classList   = 'label';
					tasklabel.id          = taskinp.id;
					tasklabel.textContent = taskinp.value;
					// tasklabel.style.visibility = '';
					taskinp.parentNode.replaceChild(tasklabel, taskinp)
				}
				else{
					// alert('Please add something')
					taskinp.value = tasklabel.textContent
				}
			}
		})
		// newcard.append(taskinp);
	}
})

// remove any card 
window.addEventListener('dblclick', (event)=>{
	if(event.target.classList == 'card'){
		if(confirm('are you sure to delete this card?')){
			let card = document.querySelector('#' + event.target.id)
			addcardbtn.disabled = false
			card.remove();
			console.log('card removed');
		}
	}
})