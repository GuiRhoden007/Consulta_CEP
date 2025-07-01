document.getElementById("cepForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const cep = document.getElementById("cep").value.trim();

        if (!cep.match(/^[0-9]{8}$/)) {
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                return;
            }

            document.getElementById("logradouro").value = data.logradouro || "";
            document.getElementById("complemento").value = data.complemento || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("estado").value = data.uf || "";

            const dddMap = {
                "AC": "68", "AL": "82", "AP": "96", "AM": "92", "BA": "71", "CE": "85", "DF": "61",
                "ES": "27", "GO": "62", "MA": "98", "MT": "65", "MS": "67", "MG": "31", "PA": "91",
                "PB": "83", "PR": "41", "PE": "81", "PI": "86", "RJ": "21", "RN": "84", "RS": "51",
                "RO": "69", "RR": "95", "SC": "48", "SP": "11", "SE": "79", "TO": "63"
            };

            const estado = data.uf || "";
            document.getElementById("ddd").value = dddMap[estado] || "";

        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
        }
    });

    document.getElementById("saveButton").addEventListener("click", function() {
        const nome = document.getElementById("nome").value.trim();
        const cep = document.getElementById("cep").value.trim();
        const logradouro = document.getElementById("logradouro").value.trim();
        const complemento = document.getElementById("complemento").value.trim();
        const bairro = document.getElementById("bairro").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const estado = document.getElementById("estado").value.trim();
        const ddd = document.getElementById("ddd").value.trim();
    
        if (nome && cep && logradouro && bairro && cidade && estado && ddd) {
            const userData = {
                nome: nome,
                cep: cep,
                logradouro: logradouro,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                ddd: ddd
            };
    
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    });
    
    
