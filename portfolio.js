document.addEventListener("DOMContentLoaded", function()
{
    const form = document.getElementById('kesanPesan');
    const submit = document.getElementById('submit');
    const response = document.getElementById('response');

    const savedText = localStorage.getItem('userText');
    if(savedText)
    {
        document.getElementById('message').value = savedText;
        response.innerText = savedText;
    }

    form.addEventListener('submit', function(event)
    {
        event.preventDefault();

        document.querySelectorAll('.error').forEach(el => el.innerText = '');
        response.innerText = '';

        let hasError = false;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if(!name)
        {
            document.getElementById('nameError').innerText = 'Nama tidak boleh kosong.';
            hasError = true;
        }
        if(!email)
        {
            document.getElementById('emailError').innerText = 'Email tidak boleh kosong.';
            hasError = true;
        }
        if(!message)
        {
            document.getElementById('messageError').innerText = 'Pesan tidak boleh kosong.';
            hasError = true;
        }

        if (hasError) return;

        submit.innerHTML = 'Loading...';
        submit.disabled = true;

        setTimeout(() =>
        {
            fetch('https://debug.nafkhanzam.com/web-programming-e03',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            })
            .then(response => response.json())
            .then(data =>
            {
                if(data.success)
                    {
                    response.innerText = 'Terkirim';
                    form.reset();
                    localStorage.removeItem('userText');
                }
                else
                {
                    response.innerText = 'Gagal';
                }

                submit.innerHTML = 'Kirim';
                submit.disabled = false;
            })
            .catch(error =>
            {
                response.innerText = 'Gagal';
                submit.innerHTML = 'Kirim';
                submit.disabled = false;
            });
        }, 2000);
    });

    document.getElementById('message').addEventListener('input', function(event)
    {
        localStorage.setItem('userText', event.target.value);
        response.innerText = event.target.value;
    });
});
