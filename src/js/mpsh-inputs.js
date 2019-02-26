
// ******************** Utilities ********************//

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const autofillContent = `"${String.fromCharCode(0xFEFF)}"`;
function checkAutofill(input) {
    if (!input.value) {
        const style = window.getComputedStyle(input);
        if (style.content !== autofillContent)
            return false;
    }

    //the autofill was detected
    input.classList.add('valid'); //replace this. do want you want to the input
    return true;
}

function printObject(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert(out);
}

// ******************** Material Inputs ********************//

function TextInputLabelClick(selector) {
    if ($(selector).siblings("input")) {
        $(selector).siblings("input").focus();
    }

    if ($(selector).siblings("textarea")) {
        $(selector).siblings("textarea").focus();
    }
}

function TextInputClick(selector) {
    $(selector).parent().addClass("is-focused");
}

function TextInputBlur(selector) {
    $(selector).parent().removeClass("is-focused");
}

function TextInputChange(selector) {
    if ($(selector).val() === "") {
        $(selector).parent().removeClass("is-filled");
    }
    else {
        $(selector).parent().addClass("is-filled");
    }
}

var ReafreshCount = 20;
function ReafreshInputsStates() {

    setTimeout(function () {

        $(".mpsh-form-group input").each(function () {
            if (isChrome) {
                if (checkAutofill(this))
                    $(this).click();
                else
                    $(this).change();
            }
            else {
                $(this).change();
            }
        });

        $(".mpsh-form-group textarea").each(function () {
            if (isChrome) {
                if (checkAutofill(this))
                    $(this).click();
                else {
                    $(this).change();
                }
            }
            else {
                $(this).change();
            }
        });
        
        ReafreshCount--;
        ReafreshInputsStates();
    }, 100);
};

$(document).ready(function () {

    $(".mpsh-form-group input").focusin(function () {
        TextInputClick(this);
    });

    $(".mpsh-form-group textarea").focusin(function () {
        TextInputClick(this);
    });

    $(".mpsh-form-group input").click(function () {
        TextInputClick(this);
    });

    $(".mpsh-form-group textarea").click(function () {
        TextInputClick(this);
    });


    $(".mpsh-form-group label").click(function () {
        TextInputLabelClick(this);
    });

    $(".mpsh-form-group input").blur(function () {
        TextInputBlur(this);
    });

    $(".mpsh-form-group textarea").blur(function () {
        TextInputBlur(this);
    });

    $(".mpsh-form-group input").change(function () {
        TextInputChange(this);
    });

    $(".mpsh-form-group textarea").change(function () {
        TextInputChange(this);
    });

    ReafreshInputsStates();

});


// ******************** Validation ********************//
$(document).ready(function () {

    $(".mpsh-form-group [type='tel']").on('input', function () {

        var val = $(this).val();

        if (val.length > 11)
            val = val.substr(0, 11);

        let result = "";
        for (var j = 0; j < val.length; j++) {
            if (!isNaN(val[j])) {
                result += val[j];
            }
        }

        $(this).val(result);
    });
});