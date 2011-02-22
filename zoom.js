var Zoom = new Class({

	enabled: true,
	
	sizes: {
		large: 960,
		small: 200 
	},
	
	initialize: function(elements)
	{
		this.elements = $$(elements);

		this.elements.each(function(el){
			this.attach(el);	
		}, this);
	},

	attach: function(el)
	{
		new Element('span.magnifier').inject(el.getElement('a'));

		el.addEvent('click', function(e){
			e.stop();

			if(!this.enabled)
			{
				return;
			}

			this.enabled = false;

			var extend = el.getStyle('width').toInt() == this.sizes.small;
			var imagePath = el.getElement('a').get('href');

			new Asset.image(imagePath, {
				onload: function(image){
					var images = el.getElements('img');

					if(images.length < 2)
					{
						image.inject(images[0], 'after');
					}
					else
					{
						images[1].setStyle('display', extend ? '' : 'none');
					}
					images[0].setStyle('display', extend ? 'none' : '');
				}.bind(this)
			});

			new Fx.Morph(el, {
				duration: 500,
				transition: extend ? 'quart:in' : 'quart:out'
			}).start({
				marginRight: extend ? 0 : 10,
				padding: extend ? 0 : 7,
				width: extend ? this.sizes.large : this.sizes.small
			}).chain(function(){
				this.enabled = true;	
			}.bind(this));
			
			new Fx.Tween(el.getElement('.title')).start('padding-left', extend ? 5 : 0);
		}.bind(this));
	}

});