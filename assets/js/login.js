$(function () {
    $('#goLogin').on('click', function () {
        $('.form-login').show()
        $('.form-reg').hide()
    })
    $('#goReg').on('click', function () {
        $('.form-login').hide()
        $('.form-reg').show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#reg_pwd').val()
            if (pwd !== value) {
                return "两次输入的密码不一样！"
            }
        }
    })

    // 注册

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/api/reguser",
            data: {
                username: $('#reg_uname').val(),
                password: $('#reg_pwd').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#goLogin').click()
                $('#form_reg .layui-input').val('')
            }
        })
    })
    // 登录

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('coken', res.coken)
                location.href = '/index.html'
            }
        })
    })
})