/*******************************************************
** this plugin was created by Mohammad Shahrouri (swe_shahrouri@live.com)
** https://github.com/mshahrouri/jQuery.Cascade
** you can use this plugin in any way you want
*******************************************************/

(function ($) {
    $.extend($.fn, {
        cascade: function (options) {
            if (options.dependent == undefined)
                throw "options.dependent is undefined";
            if (options.url == undefined)
                throw "options.url is undefined";
            if (options.textKey == undefined)
                throw "options.textKey is undefined";
            if (options.valueKey == undefined)
                throw "options.valueKey is undefined";
            if (options.argName == undefined)
                throw "options.argName is undefined";


            var dependentDDL = $("#" + options.dependent);

            return this.each(function () {
                var source = $(this);
                source.change(function () {
                    var onErrorFunc = function () { };
                    if (options.onError != undefined) {
                        onErrorFunc = options.onError;
                    }
                    
                    var onCompleteFunc = function () { };
                    if (options.onComplete != undefined) {
                        onCompleteFunc = options.onComplete;
                    }
                    
                    var beforeRequestFunc = function () { };
                    if (options.beforeRequest != undefined) {
                        beforeRequestFunc = options.beforeRequest;
                    }
                    beforeRequestFunc();
                    
                    if (options.defualtItemText == undefined)
                    {
                        options.defualtItemText = "";
                    }

                    dependentDDL.empty().append(new Option(options.defualtItemText, "-1")).val("-1");

                    var data = '{"' + options.argName + '":"' + source.val() + '"';

                    if (options.extraParam != undefined) {
                        for (var key in options.extraParam) {
                            data += ',"' + key + '":"' + options.extraParam[key] + '"';
                        }
                    }

                    if (options.additionalDDL != undefined && options.additionalDDL.length > 0) {
                        for (var i = 0; i < options.additionalDDL.length; i++) {
                            data += ',"' + options.additionalDDL[i].argName + '":"' + $("#" + options.additionalDDL[i].ID).val() + '"';
                        }
                    }

                    data += '}';

                    data = $.parseJSON(data);

                    var requestType = options.requestType == undefined ? "GET" : options.requestType;

                    $.ajax(
                        {
                            type: requestType,
                            url: options.url,
                            data: data,
                            dataType: "json",
                            cache: false,
                            success: function (result) {
                                if (result != undefined && result.length > 0) {
                                    for (var j = 0; j < result.length; j++) {
                                        dependentDDL.append(new Option(result[j][options.textKey], result[j][options.valueKey]));
                                    }
                                }
                            },
                            error: function (error) {
                                onErrorFunc(error);
                            },
                            complete: function() {
                                onCompleteFunc();
                            }
                        });
                });
            });
        }
    });
})(jQuery);