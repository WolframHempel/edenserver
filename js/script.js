 window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$(function(){

	/**
	* Start blurry dots that move around in the background
	*/
	bgCanvas = new BgCanvas( $("header"), 250 );

	/**
	* Initialize the interactive folder tree
	*/
	$( '.folderTree' ).each(function(){ new FolderTree( $(this) ); });

	/**
	* Until the documentation and example links actually lead somewhere
	*/
	$( "nav a[href='#']").click(function(e){
		e.preventDefault();
		$('#myModal').modal( "show" );
	});
	
	/**
	* Apply Syntax highlighting to code samples
	*/
	SyntaxHighlighter.all();
});