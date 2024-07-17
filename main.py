from flask import Flask, render_template, request, redirect, url_for, flash, session, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = 'a1febfe912169bef39a4e802afee946fd0ac97d0'
app.permanent_session_lifetime = datetime.timedelta(days=1)

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
class CompletedTests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(80), nullable=False)
    profession = db.Column(db.String(20), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    completeTime = db.Column(db.String(40), nullable=False)

with app.app_context():
    db.create_all()
    db.session.commit()

@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'data' in session:
        return redirect(url_for('index'))
    if request.method == 'POST':
        login = request.form['login']
        password = request.form['password']
        user = User.query.filter_by(login=login).first()
        if user:
            flash("Такой пользователь уже существует", category="error")
        else:
            new_user = User(login=login)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('login'))    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login = request.form['login']
        password = request.form['password']
        user = User.query.filter_by(login=login).first()
        if user and user.check_password(password):
            session['data'] = login
            return redirect(url_for('index'))
        else:
            flash("Неправильный логин или пароль", category='error')
        
    return render_template('login.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test/<string:prof>')
def test(prof):
    user = CompletedTests.query.filter_by(login=session['data']).first()
    if 'data' in session and not user:
        session['prof'] = prof[:-5]
        return render_template(f'{prof}')
    elif prof == 'child-site3':
        abort(404)
    else:
        return "Вы уже выполнили этот тест"

@app.route('/addscore', methods = ["POST"])
def addscore():
    data = request.json
    print(data)
    newCompletedTest = CompletedTests(login = session['data'], profession=session['prof'], score = data['score'], completeTime = datetime.date.today())
    db.session.add(newCompletedTest)
    db.session.commit()
    return jsonify(data)

# @app.route('/test')
# def test():
#     return session['data']

if __name__ == "__main__":
    app.run(debug=False)
