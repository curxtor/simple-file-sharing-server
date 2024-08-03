const express = require('express')
const app = express()
const port = process.argv.slice(2);
const cors = require('cors')
const multer = require('multer')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('port', port[0])

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
			cb(null, './share');
	},
	filename: function(req, file, cb) {
			cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
	}
});

const upload = multer({ storage: storage }).array('files[]');


app.get('/', (req,res) => {
    res.end('hello')
		console.log(location.host)

})

app.post('/sharing', upload, (req,res) => {
		res.status(200).json({ success: true, message: 'http://87.242.86.34:5000/sharing/' + req.files[0].filename })
})

app.get('/sharing/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = __dirname + "/share/" + filename

  res.download(filepath);
});

app.listen(app.get('port'), () => {
    console.log(`[ OK ] :: Server is running on localhost:${port}`)
})