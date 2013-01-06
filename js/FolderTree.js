FolderTree = function( $root )
{
	this._$root = $root;
	this._$root.find( "li.folder" ).click( this._onClick.bind( this ) );

	this.setIntitialState();
};

FolderTree.prototype.setIntitialState = function()
{
	this._close( this._$root.find( "li.folder:not(.open)" ) );
};

FolderTree.prototype._onClick = function( oEvent )
{
	oEvent.stopPropagation();
	this._toggleState( $( oEvent.target ) );
};

FolderTree.prototype._toggleState = function( $li )
{
	if( $li.hasClass( "folder" ) )
	{
		if( $li.hasClass( "open" ) )
		{
			this._close( $li );
		}
		else
		{
			this._open( $li );
		}
	}
};


FolderTree.prototype._close = function( $folders )
{
	$folders.each(function(){
		$( this ).removeClass( "open" ).find( "> i" ).attr( "class", "icon-folder-close" );
		$( this ).find( "> ul" ).hide();
	});
};

FolderTree.prototype._open = function( $folders )
{
	$folders.each(function(){
		$( this ).addClass( "open" ).find( "> i" ).attr( "class", "icon-folder-open" );
		$( this ).find( "> ul" ).show();
	});
};

