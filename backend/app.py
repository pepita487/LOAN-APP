
import flask

app = flask.Flask(__name__, static_folder='../build', static_url_path=None)
app.debug = True


@app.route('/loan', methods=['POST'])
def loan():
    req = flask.request.get_json(force=True)
    tax_id = req.get('taxId', None)
    business_name = req.get('businessName', None)
    requested_amount = int(req.get('requestedAmount', None))

    if requested_amount > 50000:
      loan_response = "Declined"
    elif requested_amount == 50000:
      loan_response = "Undecided"
    else:
      loan_response = "Approved"

    return {'response': loan_response}, 200

if __name__ == '__main__':
    app.run()