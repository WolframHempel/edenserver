BgCanvas = function( $container, nHeight )
{
	
	this._eCanvas = document.createElement( "canvas" );
	this._eCanvas.width = $( window ).width();
	this._eCanvas.height = nHeight;

	this._pPoints = [];
	this._nNumberOfPoints = 4;

	this.m_pColors = [
		[ 25, 164, 211 ],
		[ 43, 182, 222 ],
		[ 13, 211, 181 ],
		[ 43, 222, 216 ]
	];
	// this.m_pColors = [
	// 	[ 0, 255, 255 ],
	// 	[ 255, 255, 0 ],
	// 	[ 255, 0, 255 ],
	// 	[ 255, 255, 0 ]
	// ];
	this._nMinSpeed = 2;
	this._nMaxSpeed = 10;
	this._stepX = 5;
	this._stepY = 5;
	$container.append( this._eCanvas );

	this._context = this._eCanvas.getContext( "2d" );

	$( window ).resize( this._resize.bind( this ) );

	this._createPoints();
	
	this._nextFrame();
};

BgCanvas.prototype._nextFrame = function()
{

	this._render();
	//this._drawPoints();
	this._movePoints();
	
	requestAnimationFrame( this._nextFrame.bind( this ) );
};

BgCanvas.prototype._movePoints = function()
{
	var x,y;

	for( var p = 0; p < this._nNumberOfPoints; p++ )
	{
		var mPoint = this._pPoints[ p ];

		x = mPoint.x + Math.sin( mPoint.a ) * mPoint.v;
		y = mPoint.y + Math.cos( mPoint.a ) * mPoint.v;

		if( y >= this._eCanvas.height || y <= 0 )
		{
			mPoint.a = Math.PI - mPoint.a;
		}

		if( x <= 0 || x >= this._eCanvas.width )
		{
			mPoint.a = -1 * mPoint.a;
		}

		mPoint.x = x;
		mPoint.y = y;
	}
};

BgCanvas.prototype._render = function()
{
	var oImageData = this._context.createImageData( this._eCanvas.width, this._eCanvas.height );
	var x, y, i, r, g, b, p, pDistances, mPoint, nDistanceSum, f, _x, _y;


	for( y = 0; y < this._eCanvas.height; y += this._stepX )
	{
		for( x = 0; x < this._eCanvas.width; x += this._stepY )
		{

			pDistances = [];
			nDistanceSum = r = g = b = 0;

			for( p = 0; p < this._nNumberOfPoints; p++ )
			{
				mPoint = this._pPoints[ p ];
				pDistances[ p ] = 1 / Math.sqrt( Math.pow( mPoint.x - x, 2 ) + Math.pow( mPoint.y - y, 2 ) );
				nDistanceSum += pDistances[ p ];
			}

			for( p = 0; p < this._nNumberOfPoints; p++ )
			{
				f = pDistances[ p ] / nDistanceSum;
				
				r += this._pPoints[ p ].r * f;
				g += this._pPoints[ p ].g * f;
				b += this._pPoints[ p ].b * f;
			}

			r = Math.floor( r );
			g = Math.floor( g );
			b = Math.floor( b );

			for( _y = y; _y < y + this._stepY; _y++ )
			{
				for( _x = x; _x < x + this._stepX; _x++ )
				{
					i = ( this._eCanvas.width * _y + _x ) * 4;
					oImageData.data[ i ] = r;
					oImageData.data[ i + 1 ] = g;
					oImageData.data[ i + 2 ] = b;
					oImageData.data[ i + 3 ] = 255;
				}
			}
		}
	}

	this._context.putImageData( oImageData, 0, 0 );
};
/**
* Draw points, dev only
*/
BgCanvas.prototype._drawPoints = function()
{
	for( p = 0; p < this._nNumberOfPoints; p++ )
	{
		var po = this._pPoints[ p ];
		this._context.fillStyle = "rgb(" + po.r + "," + po.g + "," + po.b + ")";
		this._context.fillRect( po.x - 4, po.y - 4, 9, 9 );
		this._context.fillStyle = "#000000";
		this._context.strokeRect( po.x - 4, po.y - 4, 9, 9 );
	}
};

BgCanvas.prototype._resize = function()
{
	this._pPoints = [];
	this._eCanvas.width = $( window ).width();
	this._createPoints();
};


BgCanvas.prototype._createPoints = function()
{
	var mPoint;

	for( var i = 0; i < this._nNumberOfPoints; i++ )
	{
		mPoint = {};
		mPoint.x = Math.floor( this._eCanvas.width * Math.random() );
		mPoint.y = Math.floor( this._eCanvas.height * Math.random() );
		mPoint.r = this.m_pColors[ i ][ 0 ];
		mPoint.g = this.m_pColors[ i ][ 1 ];
		mPoint.b = this.m_pColors[ i ][ 2 ];
		mPoint.a = 2 * Math.PI * Math.random();
		mPoint.v = this._nMinSpeed + this._nMaxSpeed * Math.random();

		this._pPoints.push( mPoint );
	}
};