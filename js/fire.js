class Fire
{
    constructor(width, height, pixelSize)
    {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.pixelSize = pixelSize;
        this.cols = Math.floor(width/pixelSize)
        this.rows = Math.floor(height/pixelSize);
        this.damping = 0.9;

        this.buffer1 = [];
        this.buffer2 = [];

        this.setupArrs();
        var temp = this.buffer1.slice();
    }

    setupArrs = function()
    {
        for (var i = 0; i < this.cols; i++)
        {
            var temp = []
            for (var j = 0; j < this.rows; j++)
            {
                temp.push(0);
            }
            this.buffer1.push(temp)
        }
        this.buffer2 = this.buffer1.slice()

    }

    fire = function()
    {
        for (var i = 0; i < this.cols; i++)
        {
            this.buffer1[i][this.rows -1] = 5;
        }
    }

    draw = function(ctx)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,this.canvasWidth, this.canvasHeight);
        for (var i = 1; i < this.cols-1; i++)
        {
            for (var j = 1; j < this.rows-1; j++)
            {
                
                var r = this.buffer1[i][j];// * 0.7;
                var g = this.buffer1[i][j];// * 0.8;
                var b = this.buffer1[i][j];
                ctx.fillStyle = "rgb(" + String(r) + "," + String(g) + "," + String(b) + ")";
                ctx.fillRect(i*this.pixelSize,j*this.pixelSize,this.pixelSize,this.pixelSize);
            
                this.buffer2[i][j-1] = 
                    this.buffer1[i+1][j] +
                    this.buffer1[i-1][j] + 
                    this.buffer1[i][j+1] + 
                    this.buffer1[i][j-1]

                this.buffer2[i][j] /= 4;

                }
        }

        this.buffer1 = [];
        for (var i = 0; i < this.buffer2.length; i++)
        {
            this.buffer1.push(this.buffer2[i].slice());
        }
        

    }

}