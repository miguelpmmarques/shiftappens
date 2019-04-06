
var gn;

function init_gn() {
    var args = {
    logger: logger
    };

    gn = new GyroNorm();

    gn.init(args).then(function() {
    var isAvailable = gn.isAvailable();
    if(!isAvailable.deviceOrientationAvailable) {
        logger({message:'Device orientation is not available.'});
    }

    if(!isAvailable.accelerationAvailable) {
        logger({message:'Device acceleration is not available.'});
    }

    if(!isAvailable.accelerationIncludingGravityAvailable) {
        logger({message:'Device acceleration incl. gravity is not available.'});
    } 

    if(!isAvailable.rotationRateAvailable) {
        logger({message:'Device rotation rate is not available.'});
    }

    start_gn();
    }).catch(function(e){

    console.log(e);
    
    });
}

function logger(data) {
    $('#error-message').append(data.message + "\n");
}

function stop_gn() {
    gn.stop();
}

function start_gn() {
    gn.start(gnCallBack);
}

function gnCallBack(data) {
    $('#do_alpha').val(data.do.alpha);
    $('#do_beta').val(data.do.beta);
    $('#do_gamma').val(data.do.gamma);

    $('#dm_x').val(data.dm.x);
    $('#dm_y').val(data.dm.y);
    $('#dm_z').val(data.dm.z);

    $('#dm_gx').val(data.dm.gx);
    $('#dm_gy').val(data.dm.gy);
    $('#dm_gz').val(data.dm.gz);

    $('#dm_alpha').val(data.dm.alpha);
    $('#dm_beta').val(data.dm.beta);
    $('#dm_gamma').val(data.dm.gamma);
}

function norm_gn() {
    gn.normalizeGravity(true);
}

function org_gn() {
    gn.normalizeGravity(false);
}

function set_head_gn() {
    gn.setHeadDirection();
}

function showDO() {
    $('#do').show();
    $('#dm').hide();
    $('#btn-dm').removeClass('selected');
    $('#btn-do').addClass('selected');
}

function showDM() {
    $('#dm').show();
    $('#do').hide();
    $('#btn-do').removeClass('selected');
    $('#btn-dm').addClass('selected');
}