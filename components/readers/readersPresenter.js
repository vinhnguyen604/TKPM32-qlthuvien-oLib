const { user } = require('../../db/models/');
const { readerType } = require('../../db/models/');

presenter = {};

presenter.renderAddReader = (req, res, next) => {
    res.render('components/readers/addReader', 
    { title: 'Thêm độc giả',
      pageName: 'Thêm độc giả' });
}

presenter.getReaderType = async (req, res, next) => {
    const allType = await readerType.getAllType();
    res.send(allType);
}

presenter.addNewReader = async (req, res, next) => {
    const readerInfo = req.body;
    readerInfo.DoB = readerInfo.DoB || null;
    try {
        const newReader = await user.addNewReader(readerInfo)
        res.send({ msg: "success", err: null });
    } catch (err) {
        res.send({ msg: null, err: err });
    } 
}

presenter.getReaderList = async (req, res, next) => {
    const filter = req.query;
    console.log(filter);
    try {
        const readerList = await user.getReaderList(filter);
        res.send({ readerList: readerList, err: null});
    } catch(err) {
        console.log(err);
        res.send({ readerList: null, err: err});
    }
}

presenter.deleteReader = async (req, res, next) => {
    const readerId = req.query.id;
    try {
        const reader = await user.deleteReader(readerId);
        res.send(reader);
    } catch(err) {
        console.log(err);
        res.send("Error");
    }
};

presenter.renderEditReader = async (req, res, next) => {
    res.render('components/readers/account', 
        {   title: 'Quản lí tài khoản',
            pageName: 'Cập nhật thông tin tài khoản' });
};

presenter.renderIndex = (req, res, next) => {
    res.render('components/readers/index',
        {   title: 'Quản lí tài khoản',
            pageName: 'Danh sách tài khoản' });
};

presenter.findById = async (req, res, next) => {
    const readerId = req.query.id;
    try {
        const reader = await user.findReaderById(readerId);
        console.log(reader);
        res.send(reader);
    } catch(err) {
        console.log(err);
        res.send("Error occurred!");
    }
}

module.exports = presenter;