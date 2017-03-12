$(document).ready(function(){

	/* the only global variable, for now ignores pre-populated items */
	var state = {
		itemsObjects: [] // array of objects, name : Boolean (true = checked, false = unchecked)
	};

	var parentUL = $('ul.shopping-list');


	/** TODO: add prepoplulated items to state
	function copyHardCodedItemsToState(parent){
		console.log(parent.children());
	}
	copyHardCodedItemsToState(parentUL);
	 **/
	 
	addItemToState(state, 'apples', false);
	addItemToState(state, 'oranges', false);
	addItemToState(state, 'milk', true);
	addItemToState(state, 'bread', false);
	renderList(state, parentUL);


	function addItemToState(state, item, checkedBoolean) {
		var itemObject = {};
		itemObject.name = item;
		itemObject.checked = checkedBoolean;
		state.itemsObjects.push(itemObject);

	};



	$('#js-shopping-list-form').submit(function (event){
		//console.log('form submitted');
		event.preventDefault();
		var itemText = $.trim($('#shopping-list-entry').val());
		$('#shopping-list-entry').val('');
		if(!itemText.length){return false;}
		addAndRender(itemText);

		/* ADD ITEMS */
		function addAndRender(itemName){
			//console.log('addAndRender called');
			addItemToState(state, itemName, false);
			renderList(state, parentUL);
		}





	
	}); //form.submit


	/* should renderList be moved outsite of form.submit to deal with pre-populated items? */
	function renderList(state, element) {
		//console.log("renderList called");
	    
	    var itemsHTML = state.itemsObjects.map(function(itemObject) {
	    	var itemWrapper = $('<li><span class="shopping-item"></span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>');
	        itemWrapper.find('.shopping-item').html(itemObject.name);
	        if(itemObject.checked === true){
	        	itemWrapper.find('.shopping-item').addClass('shopping-item__checked');
	        }
	        // todo: check for checked boolan.
	        return itemWrapper;
	    });
	    element.html(itemsHTML); // might use append() instead of html(), to handle pre-existing items;
	};

	/* DELETE & CROSSOUT ARE DELEGATED TO PARENT <ul class="shopping-list"> * /

	/* DELETE ITEMS  */

		//trigger a remove
		parentUL.on('click', 'li button.shopping-item-delete', function() { 
			//var itemName = extractItemName(this);
			//console.log('shopping-item-delete clicked');
			event.stopPropagation();
			var Nth = $(this).closest('li').index(); 
			//console.log('Nth is ' + Nth);
			removeNthItemFromState(state, Nth);
			renderList(state, parentUL);
		});
/*
		function extractItemName(longLI){
			return longLI.find('.shopping-item').html();
		}


		function removeItemFromState(state, item){
			//search itemsObjects[] for object with name == itemName
			//array.indexOf()
			//array.splice(indexOfItem, 1)
			//will not work on duplicate items (click on 2nd apple, first apple gets removed.)

			//OR

		}
*/

		function removeNthItemFromState(state, Nth){
			state = state.itemsObjects.splice(Nth,1);
		}

		


	/* CROSSOUT ITEM */
	parentUL.on('click', 'li button.shopping-item-toggle', function() { 
		event.stopPropagation();
		//$(this).closest('li').find('span.shopping-item').toggleClass('shopping-item__checked'); 
		//update state
		var Nth = $(this).closest('li').index(); 
		toggleChecked(state, Nth);
		renderList(state, parentUL);

	});
		function toggleChecked(state, Nth){
			if(state.itemsObjects[Nth].checked){
				state.itemsObjects[Nth].checked = false;
			} else{
				state.itemsObjects[Nth].checked = true;
			}
		}




}); //document.ready

