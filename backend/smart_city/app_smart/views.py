from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def abre_index(request):
    mensagem = "ta funcionando :) "
    return HttpResponse(mensagem)


def cad_user(request):
    return render(request, 'Cad_User_Api.html')