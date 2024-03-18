var app = Vue.createApp({
    data(){
        return {
            brandColor: "#6366F1",
            rowCount: 1,
            note: true,
            currency: '$',
            rows: [{ amount: '', unit: '', total: 0 }],
            subTotal: 0,
            taxPercentage: '',
            tax: 0,
            total: 0,
            message: `Dear Arman Rahman,

            I've provided a breakdown of the costs for the recent work completed below. Kindly make the payment at your earliest convenience. Feel free to reach out if you have any questions.
            
            Thank you,
            Your Name`
        }
    },

    computed: {
        year() {
            const currentDate = new Date();
            return currentDate.getFullYear();
        },
    },
    methods:{
        addRow() {
            this.rowCount++;

            this.rows.push({ amount: '', unit: '', total: 0 });
        },
        removeRow(){
            this.rowCount--;

            this.rows.pop();
            this.calculatePercentage();
        },
        calculateSubTotal(index) {
            this.rows[index].total = this.rows[index].amount * this.rows[index].unit;

            this.calculatePercentage();
        },
        calculatePercentage(){
            this.subTotal = this.rows.reduce((acc, obj) => acc + obj.total, 0);
            this.tax = (this.subTotal * (this.taxPercentage/100)).toFixed(3);
            this.calculateTotal();
        },
        calculateTotal(){
            this.total = parseInt(this.tax) + parseInt(this.subTotal);
        },
        download(){
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })

            setTimeout(function(){
                const element = document.getElementById("invoice");
                html2pdf().from(element).save("vueInvoice.pdf");
            }, 2000);
        }
    }
});

app.mount('#app')