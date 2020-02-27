npm run build

# conda install conda
# conda install -c pytorch -c fastai fastai

if [ ! -f server/cnn/export.pkl ]; then
    curl https://dube-hacking.s3.eu-central-1.amazonaws.com/export.pkl --output server/cnn/export.pkl
fi

if [ ! -f server/cnn/models/stage-final.pth ]; then
    curl https://dube-hacking.s3.eu-central-1.amazonaws.com/stage-final.pth --output server/cnn/models/stage-final.pth
fi
